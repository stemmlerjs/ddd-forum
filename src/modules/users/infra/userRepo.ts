
import { User } from "../domain/user";
import { UserEmail } from "../domain/userEmail";
import { UserName } from "../domain/username";

export interface IUserRepo {
  exists (userEmail: UserEmail): Promise<boolean>;
  getUserByUserName (userName: UserName): Promise<User>;
  save (user: User): Promise<void>;
}