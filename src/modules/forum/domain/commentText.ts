
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

    if (nullGuardResult.isFailure) {
      return Result.fail<CommentText>(nullGuardResult.getErrorValue());
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (minGuardResult.isFailure) {
      return Result.fail<CommentText>(minGuardResult.getErrorValue());
    }

    if (maxGuardResult.isFailure) {
      return Result.fail<CommentText>(maxGuardResult.getErrorValue());
    }

    return Result.ok<CommentText>(new CommentText(props));
  }
}