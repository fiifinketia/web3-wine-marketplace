// eslint-disable-next-line
// @ts-ignore
import axios, { AxiosRequestConfig } from 'axios';
import { createVeriffFrame } from '@veriff/incontext-sdk';

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

// async function CheckSession(walletAddress: string) {

// }

async function CreateSession(walletAddress: string, currentPage: string) {
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
  createVeriffFrame({ url: veriffResponse.verification.url });
};

export {
  CreateSession
}