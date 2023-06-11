
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";

export class {{Name | string.pascalsingular}}Id extends Entity<any> {

  get id (): UniqueEntityID {
    return this._id;
  }

  private constructor (id?: UniqueEntityID) {
    super(null, id)
  }

  public static create (id?: UniqueEntityID): Result<{{Name | string.pascalsingular}}Id> {
    return Result.ok<{{Name | string.pascalsingular}}Id>(new {{Name | string.pascalsingular}}Id(id));
  }
}
