import { UseCaseError } from "../../../../../shared/core/UseCaseError";
import { Result } from "../../../../../shared/core/Result";

export namespace GetMemberByUserNameErrors {

  export class MemberNotFoundError extends Result<UseCaseError> {
    constructor (username: string) {
      super(false, {
        message: `Couldn't find a member with the username ${username}`
      } as UseCaseError)
    }
  }

}