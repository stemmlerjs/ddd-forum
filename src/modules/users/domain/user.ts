
import { UserEmail } from "./userEmail";
import { AggregateRoot } from "shared/domain/AggregateRoot";
import { UserName } from "./username";
import { UniqueEntityID } from "shared/domain/UniqueEntityID";
import { Guard } from "shared/core/Guard";
import { Result } from "shared/core/Result";
import { UserId } from "./userId";
import { UserCreated } from "./events/userCreated";
import { UserPassword } from "./userPassword";
import { JWTToken } from "./jwt";
import { UserLoggedIn } from "./events/userLoggedIn";

interface UserProps {
  email: UserEmail;
  username: UserName;
  password: UserPassword;
  jwtToken?: JWTToken;
}

export class User extends AggregateRoot<UserProps> {

  get userId (): UserId {
    return UserId.create(this._id)
      .getValue();
  }

  get email (): UserEmail {
    return this.props.email;
  }

  get username (): UserName {
    return this.props.username;
  }

  get password (): UserPassword {
    return this.props.password;
  }

  get jwtToken (): string {
    return this.props.jwtToken;
  }

  public setCurrentAccessToken (token: JWTToken): void {
    this.addDomainEvent(new UserLoggedIn(this));
    this.props.jwtToken = token;
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