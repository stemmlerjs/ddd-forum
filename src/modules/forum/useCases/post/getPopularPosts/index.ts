
import { GetPopularPosts } from "./GetPopularPosts";
import { postRepo } from "../../../repos";
import { GetPopularPostsController } from "./GetPopularPostsController";

const getPopularPosts = new GetPopularPosts(postRepo);

const getPopularPostsController = new GetPopularPostsController(
  getPopularPosts
)

export {
  getPopularPosts,
  getPopularPostsController
}

