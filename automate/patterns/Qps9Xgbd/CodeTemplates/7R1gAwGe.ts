
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result, Either, left, right } from "../../../shared/core/Result";
import { Guard, IGuardArgument } from "../../../shared/core/Guard";
import { {{Name | string.pascalsingular}}Id } from "./{{Name | string.camelsingular}}Id";

export interface {{Name | string.pascalsingular}}Props {
  //TODO: add domain properties
}

{{~if (Kind=="aggregate")~}}
export class {{Name | string.pascalsingular}} extends AggregateRoot<{{Name | string.pascalsingular}}Props> {
{{~else~}}
export class {{Name | string.pascalsingular}} extends Entity<{{Name | string.pascalsingular}}Props> {
{{~end~}}

  get {{Name | string.camelsingular}}Id (): {{Name | string.pascalsingular}}Id {
    return {{Name | string.pascalsingular}}Id.create(this._id)
    .getValue();
  }

  //TODO: add domain properties

  private constructor (props: {{Name | string.pascalsingular}}Props, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: {{Name | string.pascalsingular}}Props, id?: UniqueEntityID): Result<{{Name | string.pascalsingular}}> {
    const guardArgs: IGuardArgument[] = [
    ];

    //TODO: add arguments to guard

    const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);

    if (guardResult.isFailure) {
      return Result.fail<{{Name | string.pascalsingular}}>(guardResult.getErrorValue());
    }

    const defaultValues: {{Name | string.pascalsingular}}Props = {
      ...props
      //TODO: other properties
    };

    const isNew{{Name | string.pascalsingular}} = !!id === false;
    const {{Name | string.camelsingular}} = new {{Name | string.pascalsingular}}(defaultValues, id);

    if (isNew{{Name | string.pascalsingular}}) {
      //TODO: do initializations
      //TODO: create domain event
      //{{Name | string.camelsingular}}.addDomainEvent(new {{Name | string.pascalsingular}}Created({{Name | string.camelsingular}}));

    }

    return Result.ok<{{Name | string.pascalsingular}}>({{Name | string.camelsingular}});
  }
}
