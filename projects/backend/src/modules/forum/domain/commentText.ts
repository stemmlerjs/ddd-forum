
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";

interface CommentTextProps {
  value: string;
}

export class CommentText extends ValueObject<CommentTextProps> {
  public static minLength: number = 2;
  public static maxLength: number = 10000;

  get value (): string {
    return this.props.value;
  }

  private constructor (props: CommentTextProps) {
    super(props);
  }

  public static create (props: CommentTextProps): Result<CommentText> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'commentText');

    if (!nullGuardResult.succeeded) {
      return Result.fail<CommentText>(nullGuardResult.message);
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (!minGuardResult.succeeded) {
      return Result.fail<CommentText>(minGuardResult.message);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail<CommentText>(maxGuardResult.message);
    }

    return Result.ok<CommentText>(new CommentText(props));
  }
}