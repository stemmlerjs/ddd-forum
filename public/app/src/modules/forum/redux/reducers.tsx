
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
        ...ReduxUtils.reportEventStatus("isSubmittingPost")
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
    default:
      return state;
  }
}