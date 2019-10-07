
import states, { ForumState } from "./states";
import * as actions from "./actions";

import { ReduxUtils } from "../../../shared/utils/ReduxUtils";
import { ForumAction } from "./actionCreators";

export default function forum (state: ForumState = states,
  action: ForumAction
) : ForumState {
  switch (action.type as actions.ForumActionType) {
    case actions.SUBMITTING_POST:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus("isSubmittingPost"),
        error: ''
      };
    case actions.SUBMITTING_POST_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus("isSubmittingPost", true)
      };
    case actions.SUBMITTING_POST_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus("isSubmittingPost", false)
      };    
      
    case actions.GETTING_RECENT_POSTS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus("isGettingRecentPosts"),
        error: ''
      };
    case actions.GETTING_RECENT_POSTS_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus("isGettingRecentPosts", true),
        recentPosts: action.posts
      };
    case actions.GETTING_RECENT_POSTS_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus("isGettingRecentPosts", false),
        error: action.error
      };

    case actions.GETTING_POST_BY_SLUG:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus("isGettingPostBySlug"),
        error: ''
      };
    case actions.GETTING_POST_BY_SLUG_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus("isGettingPostBySlug", true),
        post: action.post
      };
    case actions.GETTING_POST_BY_SLUG_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus("isGettingPostBySlug", false),
        error: action.error
      };
    default:
      return state;
  }
}