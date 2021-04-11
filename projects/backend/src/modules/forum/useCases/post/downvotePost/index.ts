
import { DownvotePost } from "./DownvotePost";
import { memberRepo, postRepo, postVotesRepo } from "../../../repos";
import { postService } from "../../../domain/services";
import { DownvotePostController } from "./DownvotePostController";

const downvotePost = new DownvotePost(
  memberRepo, postRepo, postVotesRepo, postService
)

const downvotePostController = new DownvotePostController(
  downvotePost
)

export { downvotePost, downvotePostController }