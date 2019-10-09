
import { UseCaseError } from "../../../../../shared/domain/UseCaseError";
import { Result } from "../../../../../shared/core/Result";

export namespace UpvotePostErrors {

  export class MemberNotFoundError extends Result<UseCaseError> {
    constructor () {
      super(false, {
        message: `Couldn't find a member to upvote the post.`
      } as UseCaseError)
    }
  }

  export class PostNotFoundError extends Result<UseCaseError> {
    constructor (postId: string) {
      super(false, {
        message: `Couldn't find a post by postId {${postId}}.`
      } as UseCaseError)
    }
  }

  export class AlreadyUpvotedError extends Result<UseCaseError> {
    constructor (postId: string, userId: string) {
      super(false, {
        message: `This post was already upvoted postId {${postId}}, userId {${userId}}.`
      } as UseCaseError)
    }
  }

}