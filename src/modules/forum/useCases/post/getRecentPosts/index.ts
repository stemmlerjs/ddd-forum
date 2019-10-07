
import { GetRecentPosts } from "./GetRecentPosts";
import { postRepo } from "../../../repos";
import { GetRecentPostsController } from "./GetRecentPostsController";

const getRecentPosts = new GetRecentPosts(postRepo);
const getRecentPostsController = new GetRecentPostsController(
  getRecentPosts
)

export {
  getRecentPosts,
  getRecentPostsController
}