
import { PostService } from "./postService";
import { authService } from "../../users/services";

const postService = new PostService(
  authService
)

export { postService };