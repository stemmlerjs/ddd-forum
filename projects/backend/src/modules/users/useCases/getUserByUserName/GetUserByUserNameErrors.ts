
import { UseCaseError } from "../../../../shared/core/UseCaseError";
import { Result } from "../../../../shared/core/Result";

export namespace GetUserByUserNameErrors {

  export class UserNotFoundError extends Result<UseCaseError> {    
    constructor (username: string) {
      super(false, {
        message: `No user with the username ${username} was found`
      } as UseCaseError)
    }
  } 

}