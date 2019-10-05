
import { JWTToken, RefreshToken } from "../models/tokens";

type TokenType = 'access-token' | 'refresh-token';

export interface IAuthService {
  getToken (tokenType: TokenType): JWTToken | RefreshToken;
  setToken (tokenType: TokenType, token: JWTToken | RefreshToken): void;
}

export class AuthService implements IAuthService {

  public static accessTokenName: string = 'ddd-forum-access-token';
  public static refreshTokenName: string = 'ddd-forum-refresh-token';

  public accessToken: JWTToken;
  public refreshToken: RefreshToken;
  
  constructor () {
    this.accessToken = this.getToken('access-token');
    this.refreshToken = this.getToken('refresh-token');
  }

  public getToken (tokenType: TokenType): JWTToken | RefreshToken {
    const tokenName: string = tokenType === 'access-token' 
      ? AuthService.accessTokenName 
      : AuthService.refreshTokenName
  
    const token = localStorage.getItem(tokenName);
    return token ? JSON.parse(token).token : null;
  }

  public setToken (tokenType: TokenType, token: JWTToken | RefreshToken): void {
    var d = new Date();
    d.setTime(d.getTime() + 30 * 60 * 1000); // set cookie to last 30 mins

    const tokenName: string = tokenType === 'access-token' 
      ? AuthService.accessTokenName 
      : AuthService.refreshTokenName

    localStorage.setItem(
      tokenName,
      JSON.stringify({
        token: token,
        expires: d
      })
    );
  }
  
}