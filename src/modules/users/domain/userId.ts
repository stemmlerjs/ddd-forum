
import { Entity } from "shared/domain/Entity";
import { UniqueEntityID } from "shared/domain/UniqueEntityID";
import { Result } from "shared/core/Result";

export class UserId extends Entity<any> {

  get id (): UniqueEntityID {
    return this._id;
  }

  private constructor (id?: UniqueEntityID) {
    super(null, id)
  }

  public static create (id?: UniqueEntityID): Result<UserId> {
    return Result.ok<UserId>(new UserId(id));
  }
}