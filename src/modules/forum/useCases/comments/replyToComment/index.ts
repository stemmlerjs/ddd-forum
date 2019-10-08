
import { ReplyToComment } from "./ReplyToComment";
import { memberRepo, postRepo, commentRepo } from "../../../repos";
import { ReplyToCommentController } from "./ReplyToCommentController";
import { replyToCommentService } from "../../../domain/services";

const replyToComment = new ReplyToComment(
  memberRepo, postRepo, commentRepo, replyToCommentService
)

const replyToCommentController = new ReplyToCommentController(
  replyToComment
)

export {
  replyToComment,
  replyToCommentController
}

