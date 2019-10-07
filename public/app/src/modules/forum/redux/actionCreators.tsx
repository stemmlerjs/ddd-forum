
import * as actions from "./actions";


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

export {
  submittingPost,
  submittingPostSuccess,
  submittingPostFailure
}