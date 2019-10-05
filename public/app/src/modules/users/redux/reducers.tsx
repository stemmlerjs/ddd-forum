
import states, { UsersState } from "./states";
import * as actions from "./actions";

import { UsersAction } from "./actionCreators";
import { ReduxUtils } from "../../../shared/utils/ReduxUtils";

export default function users (state: UsersState = states,
  action: UsersAction
) : UsersState {
  switch (action.type as actions.UsersActionType) {
    case actions.GETTING_USER_PROFILE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus("isFetchingUser")
      };
    case actions.GETTING_USER_PROFILE_SUCCESS:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus("isFetchingUser", true),
        user: action.user,
        isAuthenticated: true
      };
    case actions.GETTING_USER_PROFILE_FAILURE:
      return {
        ...state,
        ...ReduxUtils.reportEventStatus("isFetchingUser", false)
      };
    default:
      return state;
  }
}