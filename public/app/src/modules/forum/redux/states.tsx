
import { Post } from "../models/Post";
import { Comment } from "../models/Comment";

export interface ForumState {
  isSubmittingPost: boolean;
  isSubmittingPostSuccess: boolean;
  isSubmittingPostFailure: boolean;

  isGettingRecentPosts: boolean;
  isGettingRecentPostsSuccess: boolean;
  isGettingRecentPostsFailure: boolean;

  isGettingPostBySlug: boolean;
  isGettingPostBySlugSuccess: boolean;
  isGettingPostBySlugFailure: boolean;

  isCreatingReplyToPost: boolean;
  isCreatingReplyToPostSuccess: boolean;
  isCreatingReplyToPostFailure: boolean;

  isGettingComments: boolean;
  isGettingCommentsSuccess: boolean;
  isGettingCommentsFailure: boolean;

  isGettingPopularPosts: boolean;
  isGettingPopularPostsSuccess: boolean;
  isGettingPopularPostsFailure: boolean;

  isGettingCommentByCommentId: boolean;
  isGettingCommentByCommentIdSuccess: boolean;
  isGettingCommentByCommentIdFailure: boolean;

  recentPosts: Post[];
  popularPosts: Post[];

  post: Post | {};

  comments: Comment[];

  comment: Comment | {};

  error: string;
}

const initialForumState: ForumState = {
  isSubmittingPost: false,
  isSubmittingPostSuccess: false,
  isSubmittingPostFailure: false,

  isGettingRecentPosts: false,
  isGettingRecentPostsSuccess: false,
  isGettingRecentPostsFailure: false,

  isGettingPostBySlug: false,
  isGettingPostBySlugSuccess: false,
  isGettingPostBySlugFailure: false,

  isCreatingReplyToPost: false,
  isCreatingReplyToPostSuccess: false,
  isCreatingReplyToPostFailure: false,

  isGettingComments: false,
  isGettingCommentsSuccess: false,
  isGettingCommentsFailure: false,

  isGettingPopularPosts: false,
  isGettingPopularPostsSuccess: false,
  isGettingPopularPostsFailure: false,

  isGettingCommentByCommentId: false,
  isGettingCommentByCommentIdSuccess: false,
  isGettingCommentByCommentIdFailure: false,

  comments: [],

  recentPosts: [],
  popularPosts: [],

  post: {},

  comment: {},

  error: ''
}

export default initialForumState;
