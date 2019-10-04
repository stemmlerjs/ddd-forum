
import { BaseAPI } from "../../../shared/infra/services/BaseAPI";

export interface IUsersService {
  createUser (email: string, username: string, password: string): Promise<void>;
}

export class UsersService extends BaseAPI implements IUsersService {
  constructor () {
    super();
  }

  async createUser (email: string, username: string, password: string): Promise<void> {
    await this.post('/users', { email, username, password });
    return;
  }
}



