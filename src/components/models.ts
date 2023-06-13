import { VerificationStatus } from 'src/shared/veriff-service';

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface UserModel {
  walletAddress: string;
  avatar?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  username: string;
  phone?: string;
  dob?: string;
  isLegal: boolean;
  verificationStatus: VerificationStatus;
  settings: object;

  sessionID?: string;
  sessionToken?: string;
  sessionURL?: string;
}

