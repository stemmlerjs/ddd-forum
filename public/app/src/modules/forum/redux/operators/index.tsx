
import { submitPost } from "./submitPost";
import { PostType } from "../../models/Post";
import { getRecentPosts } from "./getRecentPosts";
import { getPostBySlug } from "./getPostBySlug";

export interface IForumOperations {
  submitPost: (title: string, type: PostType, text?: string, link?: string) => void;
  getRecentPosts: (offset?: number) => void;
  getPostBySlug (slug: string): void;
} 

export {
  submitPost,
  getRecentPosts,
  getPostBySlug
}