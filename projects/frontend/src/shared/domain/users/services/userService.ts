
import { BaseAPI } from "../../../infra/services/BaseAPI";
import { right, left } from "../../../core/Either";
import { Result } from "../../../core/Result";
import { APIResponse } from "../../../infra/services/APIResponse";
import { LoginDTO } from "../dtos/loginDTO";
import { User } from "../models/user";
import { IAuthService } from "./authService";

export interface IUsersService {
  getCurrentUserProfile (): Promise<APIResponse<User>>;
  createUser (email: string, username: string, password: string): Promise<APIResponse<void>>;
  login (username: string, password: string): Promise<APIResponse<LoginDTO>>;
  logout (): Promise<APIResponse<void>>;
}

export class UsersService extends BaseAPI implements IUsersService {

  constructor (authService: IAuthService) {
    super(authService);
  }

  async getCurrentUserProfile (): Promise<APIResponse<User>> {
    try {
      const response = await this.get('/users/me', null, { 
        authorization: this.authService.getToken('access-token') 
      });
      return right(Result.ok<User>(response.data.user as User))
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  public async logout (): Promise<APIResponse<void>> {
    try {
      await this.post('/users/logout', null, null, { 
        authorization: this.authService.getToken('access-token') 
      })
      this.authService.removeToken('access-token');
      this.authService.removeToken('refresh-token');
      return right(Result.ok<void>());
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  async login (username: string, password: string): Promise<APIResponse<LoginDTO>> {
    try {
      const response = await this.post('/users/login', { username, password });
      const dto: LoginDTO = response.data as LoginDTO;
      this.authService.setToken('access-token', dto.accessToken);
      this.authService.setToken('refresh-token', dto.refreshToken);
      return right(Result.ok<LoginDTO>(dto));
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  async createUser (email: string, username: string, password: string): Promise<APIResponse<void>> {
    try {
      await this.post('/users', { email, username, password });
      return right(Result.ok<void>());
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }
}



