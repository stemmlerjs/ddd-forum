
import { PostService } from "./postService";
import { CommentService } from "./commentService";
import { authService } from "../../users";

const commentService = new CommentService(
  authService
)

const postService = new PostService(
  authService
)

export { postService, commentService };