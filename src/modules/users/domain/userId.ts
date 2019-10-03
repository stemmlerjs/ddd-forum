
import { Entity } from "shared/domain/Entity";
import { UniqueEntityID } from "shared/domain/UniqueEntityID";

export class UserId extends Entity<any> {

  get id (): UniqueEntityID {
    return this._id;
  }

  private constructor (id?: UniqueEntityID) {
    super(null, id)
  }
}