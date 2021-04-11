
import { PostService } from "./postService";
import { authService } from "../../users/services";
import { CommentService } from "./commentService";

const commentService = new CommentService(
  authService
)

const postService = new PostService(
  authService
)

export { postService, commentService };