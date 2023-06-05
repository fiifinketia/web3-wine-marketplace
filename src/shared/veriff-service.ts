// eslint-disable-next-line
// @ts-ignore
import axios, { AxiosRequestConfig } from 'axios';
import { createVeriffFrame, MESSAGES } from '@veriff/incontext-sdk';
import { useUserStore } from 'src/stores/user-store';
import { decode, JwtPayload } from 'jsonwebtoken';

interface VeriffNewSessionResponse {
  status: string;
  verification: {
    id: string;
    url: string;
    vendorData: string;
    host: string;
    status: string;
    sessionToken: string;
  }
}

enum VerificationStatus {
  NOT_STARTED = 'NOT_STARTED',
  STARTED = 'STARTED',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  VERIFIED = 'VERIFIED'
}

interface UserStatus {
  status: VerificationStatus;
  sessionID?: string;
  sessionToken?: string;
  sessionURL?: string;
}

function CheckJWTValidity(jwt: string) {
  const decodedToken = decode(jwt) as JwtPayload;
  if (decodedToken) {
    // Issued At in seconds
    const iat = <number> decodedToken.iat;
    // Exp duration in seconds (3 days)
    const expDuration = 259200;
    const expTime = iat + expDuration;
    const currDate = Math.floor(Date.now() / 1000);

    if (expTime < currDate) {
      // Token passed 3 days
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

async function CheckUserVerification(walletAddress: string) : Promise<UserStatus> {
  const usersURL = <string> process.env.RETRIEVE_USER_STATUS;
  return <UserStatus> (await axios.get(`${usersURL}/${walletAddress}?timestamp=${Date.now()}`)).data;
}

async function StartVeriff (
  walletAddress: string,
  currentPage: string,
  continueSession: boolean,
  lastSessionURL?: string
) {
  const userStore = useUserStore();
  let VeriffURL = lastSessionURL || '';
  if (!continueSession) {
    const options : AxiosRequestConfig = {
      method: 'POST',
      url: `${process.env.VERIFF_BASE_URL}/v1/sessions`,
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-CLIENT': process.env.VERIFF_API_KEY
      },
      data: {
        verification: {
          callback: currentPage,
          vendorData: walletAddress
        }
      }
    }
    const veriffResponse : VeriffNewSessionResponse = (await axios.request(options)).data;
    const usersURL = <string> process.env.CREATE_NEW_KYC_SESSION;
    await axios.post(usersURL, {
      payload: veriffResponse.verification,
      apiKey: process.env.MKTPLACE_API_KEY
    });
    VeriffURL = veriffResponse.verification.url;
  }
  createVeriffFrame({
    url: VeriffURL,
    onEvent: function(msg) {
      if (!!userStore.user) {
        if (msg == MESSAGES.FINISHED) {
          userStore.user.verificationStatus = VerificationStatus.PENDING;
        } else if (msg == MESSAGES.CANCELED) {
          userStore.user.verificationStatus = VerificationStatus.STARTED;
        }
      }
    }
  });
};

async function HandleUserValidity() {
  try {
    const userStore = useUserStore();
    if (!!userStore.user?.walletAddress) {
      let { status, sessionID, sessionToken, sessionURL } : UserStatus = await CheckUserVerification(userStore.user.walletAddress);
      userStore.user.verificationStatus = status;
      if (status == VerificationStatus.VERIFIED) {
        return true;
      } else {
        if (status == VerificationStatus.STARTED || status == VerificationStatus.NOT_STARTED) {
          if (sessionToken) {
            const isNewSessionNeeded = CheckJWTValidity(<string> sessionToken);
            if (isNewSessionNeeded) {
              status = VerificationStatus.NOT_STARTED;
              sessionID = '';
              sessionToken = '';
              sessionURL = '';
            } else if (userStore.user.verificationStatus == VerificationStatus.NOT_STARTED) {
              userStore.user.verificationStatus = VerificationStatus.STARTED;
            }
          }
        }
        userStore.user.sessionID = sessionID;
        userStore.user.sessionToken = sessionToken;
        userStore.user.sessionURL = sessionURL;
        return false;
      }
    }
  } catch {
    throw new Error('Failed to verify user KYC status.');
  }
}

export {
  StartVeriff,
  CheckUserVerification,
  HandleUserValidity,
  UserStatus,
  VerificationStatus
}