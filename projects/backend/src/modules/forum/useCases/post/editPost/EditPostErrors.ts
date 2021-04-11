import { Result } from "../../../../../shared/core/Result"
import { UseCaseError } from "../../../../../shared/core/UseCaseError"
import { PostId } from "../../../domain/postId"

export namespace EditPostErrors {

  export class PostNotFoundError extends Result<UseCaseError> {
    constructor (id: string) {
      super(false, {
        message: `Couldn't find a post by id {${id}}.`
      } as UseCaseError)
    }
  }

  export class InvalidPostTypeOperationError extends Result<UseCaseError> {
    constructor () {
      super(false, {
        message: `If a post is a text post, we can only edit the text. If it's a link post, we can only edit the link.`
      } as UseCaseError)
    }
  }

  export class PostSealedError extends Result<UseCaseError> {
    constructor () {
      super(false, {
        message: `If a post has comments, it's sealed and cannot be edited.`
      } as UseCaseError)
    }
  }

}