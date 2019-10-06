
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";

interface PostTitleProps {
  value: string;
}

export class PostTitle extends ValueObject<PostTitleProps> {
  public static minLength: number = 2;
  public static maxLength: number = 85;

  get value (): string {
    return this.props.value;
  }

  private constructor (props: PostTitleProps) {
    super(props);
  }

  public static create (props: PostTitleProps): Result<PostTitle> {

    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'postTitle');

    if (!nullGuardResult.succeeded) {
      return Result.fail<PostTitle>(nullGuardResult.message);
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (!minGuardResult.succeeded) {
      return Result.fail<PostTitle>(minGuardResult.message);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail<PostTitle>(maxGuardResult.message);
    }

    return Result.ok<PostTitle>(new PostTitle(props));
  }
}