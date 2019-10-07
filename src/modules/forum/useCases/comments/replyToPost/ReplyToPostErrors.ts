
import { UseCaseError } from "../../../../../shared/domain/UseCaseError";
import { Result } from "../../../../../shared/core/Result";

export namespace ReplyToPostErrors {

  export class PostNotFoundError extends Result<UseCaseError> {
    constructor (slug: string) {
      super(false, {
        message: `Couldn't find a post by slug {${slug}}.`
      } as UseCaseError)
    }
  }

}