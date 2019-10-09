
import { submitPost } from "./submitPost";
import { PostType } from "../../models/Post";
import { getRecentPosts } from "./getRecentPosts";
import { getPostBySlug } from "./getPostBySlug";
import { createReplyToPost } from "./createReplyToPost";
import { getComments } from "./getComments";
import { getPopularPosts } from "./getPopularPosts";
import { getCommentByCommentId } from "./getCommentByCommentId";
import { creatingReplyToComment } from "../actionCreators";
import { getCommentReplies } from "./getCommentReplies";
import { createReplyToComment } from "./createReplyToComment"
import { downvotePost } from "./downvotePost";
import { upvotePost } from "./upvotePost";
import { upvoteComment } from "./upvoteComment";
import { downvoteComment } from "./downvoteComment";

export interface IForumOperations {
  submitPost: (title: string, type: PostType, text?: string, link?: string) => void;
  getRecentPosts: (offset?: number) => void;
  getPostBySlug (slug: string): void;
  createReplyToPost (text: string, slug: string): void;
  getComments (slug: string, offset?: number): void;
  getPopularPosts (offset?: number): void;
  getCommentByCommentId (commentId: string): void;
  createReplyToComment (comment: string, parentCommentId: string, slug: string): void;
  getCommentReplies (slug: string, commentId: string, offset?: number): void;
  downvotePost (postSlug: string): void;
  upvotePost (postSlug: string): void;
  upvoteComment (commentId: string): void;
  downvoteComment (commentId: string): void;
} 

export {
  submitPost,
  getRecentPosts,
  getPostBySlug,
  createReplyToPost,
  getComments,
  getPopularPosts,
  getCommentByCommentId,
  creatingReplyToComment,
  getCommentReplies,
  createReplyToComment,
  downvotePost,
  upvotePost,
  upvoteComment,
  downvoteComment
}