
import { GetCommentByCommentId } from "./GetCommentByCommentId";
import { commentRepo } from "../../../repos";
import { GetCommentByCommentIdController } from "./GetCommentByCommentIdController";

const getCommentByCommentId = new GetCommentByCommentId(
  commentRepo
)

const getCommentByCommentIdController = new GetCommentByCommentIdController(
  getCommentByCommentId
)

export {
  getCommentByCommentId,
  getCommentByCommentIdController
}

