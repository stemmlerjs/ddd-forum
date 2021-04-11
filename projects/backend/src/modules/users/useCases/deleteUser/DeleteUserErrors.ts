
import { UseCaseError } from "../../../../shared/core/UseCaseError";
import { Result } from "../../../../shared/core/Result";

export namespace DeleteUserErrors {

  export class UserNotFoundError extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `User not found`
      } as UseCaseError)
    }
  } 

}