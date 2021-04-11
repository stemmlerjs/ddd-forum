
import { PostService } from "./postService";
import { CommentService } from "./commentService";
import { authService } from "../../../shared/domain/users";

const commentService = new CommentService(
  authService
)

const postService = new PostService(
  authService
)

export { postService, commentService };