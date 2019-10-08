
import { ReplyToComment } from "./ReplyToComment";
import { memberRepo, postRepo, commentRepo } from "../../../repos";
import { ReplyToCommentController } from "./ReplyToCommentController";

const replyToComment = new ReplyToComment(
  memberRepo, postRepo, commentRepo
)

const replyToCommentController = new ReplyToCommentController(
  replyToComment
)

export {
  replyToComment,
  replyToCommentController
}

