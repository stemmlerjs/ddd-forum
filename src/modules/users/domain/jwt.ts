
export interface JWTClaims {
  userId: string;
  isEmailVerified: boolean;
  email: string;
  adminUser: boolean;
  sessionId?: string;
}; 

export type JWTToken = string;

export type SessionId = string;

export type RefreshToken = string;