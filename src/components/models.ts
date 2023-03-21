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
  phone?: string;
  dob?: string;
  isLegal: boolean;
  isVerified: boolean;
  settings: object;
}
