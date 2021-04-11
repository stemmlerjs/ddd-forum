
import { UseCaseError } from "../../../../../shared/core/UseCaseError";
import { Result } from "../../../../../shared/core/Result";

export namespace UpdatePostStatsErrors {

  export class PostNotFoundError extends Result<UseCaseError> {
    constructor (postId: string) {
      super(false, {
        message: `Couldn't find a post by postId {${postId}}.`
      } as UseCaseError)
    }
  }

}