
import { ReplyToPost } from "./ReplyToPost";
import { memberRepo, postRepo } from "../../../repos";
import { ReplyToPostController } from "./ReplyToPostController";

const replyToPost = new ReplyToPost(memberRepo, postRepo);

const replyToPostController = new ReplyToPostController(
  replyToPost
)

export {
  replyToPost,
  replyToPostController
}
