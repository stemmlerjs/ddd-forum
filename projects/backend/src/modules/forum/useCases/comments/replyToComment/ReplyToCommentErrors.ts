
import { UseCaseError } from "../../../../../shared/core/UseCaseError";
import { Result } from "../../../../../shared/core/Result";

export namespace ReplyToCommentErrors {

  export class PostNotFoundError extends Result<UseCaseError> {
    constructor (slug: string) {
      super(false, {
        message: `Couldn't find a post by slug {${slug}}.`
      } as UseCaseError)
    }
  }

  export class CommentNotFoundError extends Result<UseCaseError> {
    constructor (commentId: string) {
      super(false, {
        message: `Couldn't find a comment by commentId {${commentId}}.`
      } as UseCaseError)
    }
  }

  export class MemberNotFoundError extends Result<UseCaseError> {
    constructor (userId: string) {
      super(false, {
        message: `Couldn't find a member by userId {${userId}}.`
      } as UseCaseError)
    }
  }

}