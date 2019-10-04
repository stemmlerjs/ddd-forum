
import { JWTToken, JWTClaims, RefreshToken } from "../domain/jwt";

export interface IAuthService {
  signJWT (props: JWTClaims): JWTToken;
  decodeJWT (token: string): Promise<JWTClaims>;
  createRefreshToken (): RefreshToken;
  addToken (email: string, sessionId: string, token: JWTToken): Promise<any>;
  getToken(email: string, sessionId: string): Promise<string>;
}