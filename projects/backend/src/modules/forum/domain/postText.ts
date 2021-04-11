
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";

interface PostTextProps {
  value: string;
}

export class PostText extends ValueObject<PostTextProps> {
  public static minLength: number = 2;
  public static maxLength: number = 10000;

  get value (): string {
    return this.props.value;
  }

  private constructor (props: PostTextProps) {
    super(props);
  }

  public static create (props: PostTextProps): Result<PostText> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'postText');

    if (!nullGuardResult.succeeded) {
      return Result.fail<PostText>(nullGuardResult.message);
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (!minGuardResult.succeeded) {
      return Result.fail<PostText>(minGuardResult.message);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail<PostText>(maxGuardResult.message);
    }

    return Result.ok<PostText>(new PostText(props));
  }
}