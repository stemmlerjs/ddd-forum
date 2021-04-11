
import { UpvoteComment } from "./UpvoteComment";
import { postRepo, memberRepo, commentRepo, commentVotesRepo } from "../../../repos";
import { postService } from "../../../domain/services";
import { UpvoteCommentController } from "./UpvoteCommentController";

const upvoteComment = new UpvoteComment(
  postRepo, memberRepo, commentRepo, commentVotesRepo, postService
)

const upvoteCommentController = new UpvoteCommentController(
  upvoteComment
)

export {
  upvoteComment,
  upvoteCommentController
}
