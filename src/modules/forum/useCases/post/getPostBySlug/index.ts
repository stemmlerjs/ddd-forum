
import { GetPostBySlug } from "./GetPostBySlug";
import { postRepo } from "../../../repos";
import { GetPostBySlugController } from "./GetPostBySlugController";

const getPostBySlug = new GetPostBySlug(postRepo);
const getPostBySlugController = new GetPostBySlugController(getPostBySlug);

export {
  getPostBySlug,
  getPostBySlugController
}

