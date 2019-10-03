
export interface JWTClaims {
  userId: string;
  isEmailVerified: string;
  email: string;
  adminUser: boolean;
  sessionId: string;
}; 

export type JWTToken = string;