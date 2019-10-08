
import * as actions from "./actions";
import { Post } from "../models/Post";
import { Comment } from "../models/Comment";


export type ForumAction = { [key: string]: actions.ForumActionType | any };

function submittingPost (): ForumAction {
  return {
    type: actions.SUBMITTING_POST
  };
}

function submittingPostSuccess (): ForumAction {
  return {
    type: actions.SUBMITTING_POST_SUCCESS
  };
}

function submittingPostFailure (error: string): ForumAction & { error: string } {
  return {
    type: actions.SUBMITTING_POST_FAILURE,
    error
  };
}

function getRecentPosts (): ForumAction {
  return {
    type: actions.GETTING_RECENT_POSTS
  };
}

function getRecentPostsSuccess (posts: Post[]): ForumAction {
  return {
    type: actions.GETTING_RECENT_POSTS_SUCCESS,
    posts
  };
}

function getRecentPostsFailure (error: string): ForumAction & { error: string } {
  return {
    type: actions.GETTING_RECENT_POSTS_FAILURE,
    error
  };
}

function gettingPostBySlug (): ForumAction {
  return {
    type: actions.GETTING_POST_BY_SLUG
  }
}

function gettingPostBySlugSuccess (post: Post): ForumAction & { post: Post } {
  return {
    type: actions.GETTING_POST_BY_SLUG_SUCCESS,
    post
  }
}

function gettingPostBySlugFailure (error: string): ForumAction & { error: string} {
  return {
    type: actions.GETTING_POST_BY_SLUG_FAILURE,
    error
  }
}

function creatingReplyToPost (): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_POST
  }
}

function creatingReplyToPostSuccess (): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_POST_SUCCESS
  }
}

function creatingReplyToPostFailure (error: string): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_POST_FAILURE,
    error
  }
}

function gettingComments (): ForumAction {
  return {
    type: actions.GETTING_COMMENTS
  }
}

function gettingCommentsSuccess (comments: Comment[]): ForumAction {
  return {
    type: actions.GETTING_COMMENTS_SUCCESS,
    comments
  }
}

function gettingCommentsFailure (error: string): ForumAction {
  return {
    type: actions.GETTING_COMMENTS_FAILURE,
    error
  }
}

function getPopularPosts (): ForumAction {
  return {
    type: actions.GETTING_POPULAR_POSTS
  };
}

function getPopularPostsSuccess (posts: Post[]): ForumAction {
  return {
    type: actions.GETTING_POPULAR_POSTS_SUCCESS,
    posts
  };
}

function getPopularPostsFailure (error: string): ForumAction & { error: string } {
  return {
    type: actions.GETTING_POPULAR_POSTS_FAILURE,
    error
  };
}

function gettingCommentByCommentId (): ForumAction {
  return {
    type: actions.GETTING_COMMENT_BY_COMMENT_ID
  };
}

function gettingCommentByCommentIdSuccess (comment: Comment): ForumAction {
  return {
    type: actions.GETTING_COMMENT_BY_COMMENT_ID_SUCCESS,
    comment
  };
}

function gettingCommentByCommentIdFailure (error: string): ForumAction {
  return {
    type: actions.GETTING_COMMENT_BY_COMMENT_ID_FAILURE,
    error
  };
}

export {
  submittingPost,
  submittingPostSuccess,
  submittingPostFailure,

  getRecentPosts,
  getRecentPostsSuccess,
  getRecentPostsFailure,

  gettingPostBySlug,
  gettingPostBySlugSuccess,
  gettingPostBySlugFailure,

  creatingReplyToPost,
  creatingReplyToPostSuccess,
  creatingReplyToPostFailure,

  gettingComments,
  gettingCommentsSuccess,
  gettingCommentsFailure,

  getPopularPosts,
  getPopularPostsSuccess,
  getPopularPostsFailure,

  gettingCommentByCommentId,
  gettingCommentByCommentIdSuccess,
  gettingCommentByCommentIdFailure
}