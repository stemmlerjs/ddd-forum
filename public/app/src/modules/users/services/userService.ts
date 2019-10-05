
import { BaseAPI } from "../../../shared/infra/services/BaseAPI";
import { right, left } from "../../../shared/core/Either";
import { Result } from "../../../shared/core/Result";
import { APIResponse } from "../../../shared/infra/services/APIResponse";
import { LoginDTO } from "../dtos/loginDTO";
import { User } from "../models/user";
import { JWTToken, RefreshToken } from "../models/tokens";

export function checkAccessToken() {
  return localStorage.getItem("univjobs-access-token") ? true : false;
}

export function getAccessToken() {
  const token = localStorage.getItem("univjobs-access-token");
  return token ? JSON.parse(token).token : null;
}

type TokenType = 'access-token' | 'refresh-token';

export interface IUsersService {
  getCurrentUserProfile (): Promise<User>;
  createUser (email: string, username: string, password: string): Promise<APIResponse<void>>;
  login (username: string, password: string): Promise<APIResponse<LoginDTO>>;
  logout (store: any): Promise<any>;
}

export class UsersService extends BaseAPI implements IUsersService {
  private static accessTokenName: string = 'ddd-forum-access-token';
  private static refreshTokenName: string = 'ddd-forum-refresh-token';

  public currentUser: User | {} = {};
  public isAuthenticated: boolean = false;

  constructor () {
    super();
    this.checkAuthState();
  }

  private async checkAuthState (): Promise<void> {
    const accessToken = this.getToken('access-token');
    const hasAccessToken = !!accessToken === true;

    if (!hasAccessToken) return;

    try {
      const user = await this.getCurrentUserProfile();
      const userExists = !!user === true;
      
      if (userExists) {
        this.isAuthenticated = true;
      }
    } catch (err) {}
  }

  async getCurrentUserProfile (): Promise<User> {
    const response = await this.get('/users/me', null, { authorization: this.getToken('access-token') });
    this.currentUser = response.data as User;
    return this.currentUser as User;
  }

  public async logout (store: any): Promise<any> {

  }

  private setToken (tokenType: TokenType, token: JWTToken | RefreshToken): void {
    var d = new Date();
    d.setTime(d.getTime() + 30 * 60 * 1000); // set cookie to last 30 mins

    const tokenName: string = tokenType === 'access-token' 
      ? UsersService.accessTokenName 
      : UsersService.refreshTokenName

    localStorage.setItem(
      tokenName,
      JSON.stringify({
        token: token,
        expires: d
      })
    );
  }

  public getToken (tokenType: TokenType): JWTToken | RefreshToken {
    const tokenName: string = tokenType === 'access-token' 
      ? UsersService.accessTokenName 
      : UsersService.refreshTokenName

    const token = localStorage.getItem(tokenName);
    return token ? JSON.parse(token).token : null;
  }

  async login (username: string, password: string): Promise<APIResponse<LoginDTO>> {
    try {
      const response = await this.post('/users/login', { username, password });
      const dto: LoginDTO = response.data as LoginDTO;
      this.setToken('access-token', dto.accessToken);
      this.setToken('refresh-token', dto.refreshToken);
      return right(Result.ok<LoginDTO>(dto));
    } catch (err) {
      return left(err.response.data.message)
    }
  }

  async createUser (email: string, username: string, password: string): Promise<APIResponse<void>> {
    try {
      await this.post('/users', { email, username, password });
      return right(Result.ok<void>());
    } catch (err) {
      return left(err.response.data.message)
    }
  }
}



