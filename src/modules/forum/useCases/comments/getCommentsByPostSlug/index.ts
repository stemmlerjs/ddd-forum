
import { GetCommentsByPostSlug } from "./GetCommentsByPostSlug";
import { commentRepo } from "../../../repos";
import { GetCommentsByPostSlugController } from "./GetCommentsByPostSlugController";

const getCommentsByPostSlug = new GetCommentsByPostSlug(
  commentRepo
)

const getCommentsByPostSlugContainer = new GetCommentsByPostSlugController(
  getCommentsByPostSlug
)

export { 
  getCommentsByPostSlug,
  getCommentsByPostSlugContainer
}