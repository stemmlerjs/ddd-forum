import { User } from "../domain/user";

export interface IUserRepo {
  exists (userEmail: string): Promise<boolean>;
  getUserByUserName (userName: string): Promise<User>;
  save (user: User): Promise<void>;
}