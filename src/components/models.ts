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
  VERIFIED = 'VERIFIED',
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
}

export interface NotificationsSettings {
	email?: string;
	offerReceived: boolean;
	offerAccepted: boolean;
	offerOutbidded: boolean;
	offerMade: boolean;
	orderFulfilled: boolean;
	wineChanged: boolean;
}

