import { left, right } from "../../../core/Either";
import { Result } from "../../../core/Result";
import { APIResponse } from "../../../infra/services/APIResponse";
import { LoginDTO } from "../dtos/loginDTO";
import { User } from "../models/user";
import { IUsersService } from "../services/userService";

export class MockUserService implements IUsersService {

  private currentUser: User | null; 

  constructor (currentUser: User | null) {
    this.currentUser = currentUser;
  }

  async getCurrentUserProfile (): Promise<APIResponse<User>> {
    return this.currentUser ? right(Result.ok<User>(this.currentUser)) : left('User not found');
  }

  async createUser (email: string, username: string, password: string): Promise<APIResponse<void>> {
    return right(Result.ok<void>());
  }

  async login (username: string, password: string): Promise<APIResponse<LoginDTO>> {
    return right(Result.ok<LoginDTO>({
      accessToken: 'jwt-token',
      refreshToken: 'refresh-token'
    }))
  }

  async logout (): Promise<APIResponse<void>> {
    return right(Result.ok<void>());
  }
}