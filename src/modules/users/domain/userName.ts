
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Guard } from "../../../shared/core/Guard";

interface UserNameProps {
  name: string;
}

export class UserName extends ValueObject<UserNameProps> {
  public static maxLength: number = 15;
  public static minLength: number = 2;

  get value (): string {
    return this.props.name;
  }

  private constructor (props: UserNameProps) {
    super(props);
  }

  public static create (props: UserNameProps): Result<UserName> {
    const usernameResult = Guard.againstNullOrUndefined(props.name, 'username');
    if (usernameResult.isFailure) {
      return Result.fail<UserName>(usernameResult.getErrorValue())
    }

    const minLengthResult = Guard.againstAtLeast(this.minLength, props.name);
    if (minLengthResult.isFailure) {
      return Result.fail<UserName>(minLengthResult.getErrorValue())
    }

    const maxLengthResult = Guard.againstAtMost(this.maxLength, props.name);
    if (maxLengthResult.isFailure) {
      return Result.fail<UserName>(minLengthResult.getErrorValue())
    }

    return Result.ok<UserName>(new UserName(props));
  }
}