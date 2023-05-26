// eslint-disable-next-line
// @ts-ignore
import axios, { AxiosRequestConfig } from 'axios';
import { createVeriffFrame } from '@veriff/incontext-sdk';
import { useUserStore } from 'src/stores/user-store';

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
  createVeriffFrame({ url: VeriffURL });
};

async function HandleUserValidity() {
  const userStore = useUserStore();
  if (!!userStore.user?.walletAddress) {
    const { status, sessionID, sessionToken, sessionURL } : UserStatus = await CheckUserVerification(userStore.user.walletAddress);
    userStore.user.verificationStatus = status;
    if (status == VerificationStatus.VERIFIED) {
      return true;
    } else {
      userStore.user.sessionID = sessionID;
      userStore.user.sessionToken = sessionToken;
      userStore.user.sessionURL = sessionURL;
      return false;
    }
  }
}

export {
  StartVeriff,
  CheckUserVerification,
  HandleUserValidity,
  UserStatus,
  VerificationStatus
}