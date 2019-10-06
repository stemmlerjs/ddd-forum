
import { PostSlug } from "./postSlug";
import { Result } from "../../../shared/core/Result";
import { PostTitle } from "./postTitle";

let postSlug: PostSlug;
let postSlugOrError: Result<PostSlug>;
let postTitle: PostTitle;
let postTitleOrError: Result<PostTitle>;

test('Should be able to create a post slug', () => {
  postTitleOrError = PostTitle.create({ value: "HTML Developers" });
  expect(postTitleOrError.isSuccess).toBe(true);
  postTitle = postTitleOrError.getValue();
  postSlugOrError = PostSlug.create(postTitle);
  expect(postSlugOrError.isSuccess).toBe(true);
  postSlug = postSlugOrError.getValue();
  expect(postSlug.value).toContain("html-developers")
});

test('Should be able to parse out any bad characters not suitable for a slug', () => {
  postTitleOrError = PostTitle.create({ value: "K^ha^l#il^^#'s Job" });
  expect(postTitleOrError.isSuccess).toBe(true);
  postTitle = postTitleOrError.getValue();
  postSlugOrError = PostSlug.create(postTitle);
  expect(postSlugOrError.isSuccess).toBe(true);
  postSlug = postSlugOrError.getValue();
  expect(postSlug.value).toContain("khalils-job");
})