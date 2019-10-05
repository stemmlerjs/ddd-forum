
export interface User {
  userId: string;
  username: string;
  email?: string;
  isEmailVerified?: boolean;
  isAdminUser?: boolean;
  isDeleted?: boolean;
}