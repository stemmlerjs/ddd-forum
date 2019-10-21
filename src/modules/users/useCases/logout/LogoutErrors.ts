
import { UseCaseError } from "../../../../shared/core/UseCaseError";
import { Result } from "../../../../shared/core/Result";

export namespace LogoutErrors {

  export class UserNotFoundOrDeletedError extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `User not found or doesn't exist anymore.`
      } as UseCaseError)
    }
  } 

}