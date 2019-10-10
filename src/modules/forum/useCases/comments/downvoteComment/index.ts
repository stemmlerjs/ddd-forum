
import { DownvoteComment } from "./DownvoteComment";
import { postRepo, memberRepo, commentRepo, commentVotesRepo } from "../../../repos";
import { postService } from "../../../domain/services";
import { DownvoteCommentController } from "./DownvoteCommentController";

const downvoteComment = new DownvoteComment(
  postRepo, memberRepo, commentRepo, commentVotesRepo, postService
);

const downvoteCommentController = new DownvoteCommentController(
  downvoteComment
)

export {
  downvoteComment,
  downvoteCommentController
}
