
import { GetCommentsByPostSlug } from "./GetCommentsByPostSlug";
import { commentRepo, memberRepo } from "../../../repos";
import { GetCommentsByPostSlugController } from "./GetCommentsByPostSlugController";

const getCommentsByPostSlug = new GetCommentsByPostSlug(
  commentRepo, memberRepo
)

const getCommentsByPostSlugController = new GetCommentsByPostSlugController(
  getCommentsByPostSlug
)

export { 
  getCommentsByPostSlug,
  getCommentsByPostSlugController
}