
import { GetPopularPosts } from "./GetPopularPosts";
import { postRepo, memberRepo } from "../../../repos";
import { GetPopularPostsController } from "./GetPopularPostsController";

const getPopularPosts = new GetPopularPosts(postRepo, memberRepo);

const getPopularPostsController = new GetPopularPostsController(
  getPopularPosts
)

export {
  getPopularPosts,
  getPopularPostsController
}

