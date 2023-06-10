
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Guard } from "../../../shared/core/Guard";

export class CommentId extends ValueObject<{ value: UniqueEntityID }> {

  getStringValue (): string {
    return this.props.value.toString();
  }

  getValue (): UniqueEntityID {
    return this.props.value;
  }

  private constructor (value: UniqueEntityID) {
    super({ value });
  }

  public static create (value: UniqueEntityID): Result<CommentId> {
    let guardResult = Guard.againstNullOrUndefined(value, 'value');
    if (guardResult.isFailure) {
      return Result.fail<CommentId>(guardResult.getErrorValue())
    }
    return Result.ok<CommentId>(new CommentId(value));
  }
}