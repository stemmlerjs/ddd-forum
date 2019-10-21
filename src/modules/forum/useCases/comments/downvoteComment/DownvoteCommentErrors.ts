
import { UseCaseError } from "../../../../../shared/core/UseCaseError";
import { Result } from "../../../../../shared/core/Result";

export namespace DownvoteCommentErrors {

  export class MemberNotFoundError extends Result<UseCaseError> {
    constructor () {
      super(false, {
        message: `Couldn't find a member to downvote the comment.`
      } as UseCaseError)
    }
  }

  export class CommentNotFoundError extends Result<UseCaseError> {
    constructor (commentId: string) {
      super(false, {
        message: `Couldn't find a comment with id {${commentId}}.`
      } as UseCaseError)
    }
  }

  export class PostNotFoundError extends Result<UseCaseError> {
    constructor (commentId: string) {
      super(false, {
        message: `Couldn't find a post for comment {${commentId}}.`
      } as UseCaseError)
    }
  }

}