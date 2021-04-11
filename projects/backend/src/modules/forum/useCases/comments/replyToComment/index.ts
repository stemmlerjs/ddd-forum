
import { ReplyToComment } from "./ReplyToComment";
import { memberRepo, postRepo, commentRepo } from "../../../repos";
import { ReplyToCommentController } from "./ReplyToCommentController";
import { postService } from "../../../domain/services";

const replyToComment = new ReplyToComment(
  memberRepo, postRepo, commentRepo, postService
)

const replyToCommentController = new ReplyToCommentController(
  replyToComment
)

export {
  replyToComment,
  replyToCommentController
}

