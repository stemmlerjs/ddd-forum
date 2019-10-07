
import { submitPost } from "./submitPost";
import { PostType } from "../../models/Post";
import { getRecentPosts } from "./getRecentPosts";

export interface IForumOperations {
  submitPost: (title: string, type: PostType, text?: string, link?: string) => void;
  getRecentPosts: (offset?: number) => void;
} 

export {
  submitPost,
  getRecentPosts
}