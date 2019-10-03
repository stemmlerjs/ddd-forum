
import { UserEmail } from "./userEmail";
import { AggregateRoot } from "shared/domain/AggregateRoot";
import { UserName } from "./username";
import { UniqueEntityID } from "shared/domain/UniqueEntityID";
import { Guard } from "shared/core/Guard";
import { Result } from "shared/core/Result";
import { UserId } from "./userId";
import { UserCreated } from "./events/userCreated";

interface UserProps {
  userId: UserId;
  email: UserEmail;
  username: UserName;
}

export class User extends AggregateRoot<UserProps> {

  get email (): UserEmail {
    return this.props.email;
  }

  get username (): UserName {
    return this.props.username;
  }

  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create (props: UserProps, id?: UniqueEntityID): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.username, argumentName: 'username' },
      { argument: props.email, argumentName: 'email' }
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message)
    }

    const isNewUser = !!id === false;
    const user = new User(props, id);

    if (isNewUser) {
      user.addDomainEvent(new UserCreated(user));
    }

    return Result.ok<User>(user);
  }
}