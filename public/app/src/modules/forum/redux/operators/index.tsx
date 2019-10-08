
import { submitPost } from "./submitPost";
import { PostType } from "../../models/Post";
import { getRecentPosts } from "./getRecentPosts";
import { getPostBySlug } from "./getPostBySlug";
import { createReplyToPost } from "./createReplyToPost";
import { getComments } from "./getComments";
import { getPopularPosts } from "./getPopularPosts";
import { getCommentByCommentId } from "./getCommentByCommentId";

export interface IForumOperations {
  submitPost: (title: string, type: PostType, text?: string, link?: string) => void;
  getRecentPosts: (offset?: number) => void;
  getPostBySlug (slug: string): void;
  createReplyToPost (text: string, slug: string): void;
  getComments (slug: string, offset?: number): void;
  getPopularPosts (offset?: number): void;
  getCommentByCommentId (commentId: string): void;
} 

export {
  submitPost,
  getRecentPosts,
  getPostBySlug,
  createReplyToPost,
  getComments,
  getPopularPosts,
  getCommentByCommentId
}