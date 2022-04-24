
import { Mapper } from '../../../shared/infra/Mapper'
import { User } from '../domain/user';
import { UserDTO } from '../dtos/userDTO';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { UserName } from '../domain/userName';
import { UserPassword } from '../domain/userPassword';
import { UserEmail } from '../domain/userEmail';

export class UserMap implements Mapper<User> {
  public static toDTO (user: User): UserDTO {
    return {
      username: user.username.value,
      isEmailVerified: user.isEmailVerified,
      isAdminUser: user.isAdminUser,
      isDeleted: user.isDeleted
    }
  }

  public static toDomain (raw: any): User {
    const userNameOrError = UserName.create({ name: raw.username });
    const userPasswordOrError = UserPassword.create({ value: raw.user_password, hashed: true });
    const userEmailOrError = UserEmail.create(raw.user_email);

    const userOrError = User.create({
      username: userNameOrError.getValue(),
      isAdminUser: raw.is_admin_user,
      isDeleted: raw.is_deleted,
      isEmailVerified: raw.is_email_verified,
      password: userPasswordOrError.getValue(),
      email: userEmailOrError.getValue(),
    }, new UniqueEntityID(raw.base_user_id));

    userOrError.isFailure ? console.log(userOrError.getErrorValue()) : '';

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static async toPersistence (user: User): Promise<any> {
    let password: string = null;
    if (!!user.password === true) {
      if (user.password.isAlreadyHashed()) {
        password = user.password.value;
      } else {
        password = await user.password.getHashedValue();
      }
    }

    return {
      base_user_id: user.userId.id.toString(),
      user_email: user.email.value,
      is_email_verified: user.isEmailVerified,
      username: user.username.value,
      user_password: password,
      is_admin_user: user.isAdminUser,
      is_deleted: user.isDeleted
    }
  }
}