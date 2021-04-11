
import { JWTToken, RefreshToken } from "../models/tokens";

type TokenType = 'access-token' | 'refresh-token';

export interface IAuthService {
  isAuthenticated (): boolean;
  getToken (tokenType: TokenType): JWTToken | RefreshToken;
  setToken (tokenType: TokenType, token: JWTToken | RefreshToken): void;
  removeToken (tokenType: TokenType): void;
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

  private getTokenName (tokenType: TokenType): string {
    return tokenType === 'access-token' 
    ? AuthService.accessTokenName 
    : AuthService.refreshTokenName
  }

  public getToken (tokenType: TokenType): JWTToken | RefreshToken {
    const tokenName: string = this.getTokenName(tokenType);
  
    const token = localStorage.getItem(tokenName);
    return token ? JSON.parse(token).token : null;
  }

  public setToken (tokenType: TokenType, token: JWTToken | RefreshToken): void {
    var d = new Date();
    d.setTime(d.getTime() + 30 * 60 * 1000); // set cookie to last 30 mins

    const tokenName: string = this.getTokenName(tokenType);

    localStorage.setItem(
      tokenName,
      JSON.stringify({
        token: token,
        expires: d
      })
    );
  }

  public removeToken (tokenType: TokenType): void {
    const tokenName: string = this.getTokenName(tokenType);
    localStorage.removeItem(tokenName);
  }

  isAuthenticated (): boolean {
    return this.getToken('access-token') !== null;
  }
  
}