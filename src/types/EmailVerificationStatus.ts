export interface EmailVerificationStatus {
  walletAddress: string;
  email: string;
  retries: number;
  lastRetry: number;
  expiration: number;
}
