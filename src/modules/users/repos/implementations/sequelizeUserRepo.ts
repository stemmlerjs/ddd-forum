
import { IUserRepo } from "../userRepo";
import { UserName } from "../../domain/userName";
import { User } from "../../domain/user";
import { UserMap } from "../../mappers/userMap";
import { UserEmail } from "../../domain/userEmail";

export class SequelizeUserRepo implements IUserRepo {
  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  async exists (userEmail: UserEmail): Promise<boolean> {
    const BaseUserModel = this.models.BaseUser;
    const baseUser = await BaseUserModel.findOne({
      where: {
        user_email: userEmail.value
      }
    });
    return !!baseUser === true;
  }

  async getUserByUserName (userName: UserName): Promise<User> {
    const BaseUserModel = this.models.BaseUser;
    const baseUser = await BaseUserModel.findOne({
      where: {
        username: userName.value
      }
    });
    if (!!baseUser === false) return null;
    return UserMap.toDomain(baseUser);
  }

  async getUserByUserId (userId: string): Promise<User> {
    const BaseUserModel = this.models.BaseUser;
    const baseUser = await BaseUserModel.findOne({
      where: {
        base_user_id: userId
      }
    });
    if (!!baseUser === false) return null;
    return UserMap.toDomain(baseUser);
  }

  async save (user: User): Promise<void> {
    return null;
  }
}