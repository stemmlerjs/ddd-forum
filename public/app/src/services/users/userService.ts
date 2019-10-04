
import { BaseAPI } from "../../shared/infra/services/BaseAPI";

export interface IUsersService {
  createUser (email: string, username: string, password: string): Promise<void>;
  login (): Promise<any>;
}

export class UsersService extends BaseAPI implements IUsersService {
  constructor () {
    super();
  }

  async createUser (email: string, username: string, password: string): Promise<void> {
    return;
  }

  async login (): Promise<any> {
    return  null;
  }
}



