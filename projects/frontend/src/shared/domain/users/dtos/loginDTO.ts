import { JWTToken, RefreshToken } from "../models/tokens";

export interface LoginDTO {
  accessToken: JWTToken;
  refreshToken: RefreshToken;
}