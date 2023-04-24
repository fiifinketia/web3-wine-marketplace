export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export enum VerificationStatus {
  NOT_STARTED = 'NOT_STARTED',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  STAGE_1 = 'STAGE_1',
  STAGE_2 = 'STAGE_2',
  STAGE_3 = 'STAGE_3',
}

export interface UserModel {
  walletAddress: string;
  avatar?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  dob?: string;
  isLegal: boolean;
  verificationStatus: VerificationStatus;
  settings: object;
}
