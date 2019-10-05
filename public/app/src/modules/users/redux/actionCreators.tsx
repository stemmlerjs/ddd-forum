
import * as actions from "./actions";
import { User } from "../models/user";

export type UsersAction = { [key: string]: actions.UsersActionType | any };

function gettingUserProfile (): UsersAction {
  return {
    type: actions.GETTING_USER_PROFILE
  };
}

function gettingUserProfileSuccess (user: User): UsersAction & { user: User } {
  return {
    type: actions.GETTING_USER_PROFILE_SUCCESS,
    user
  };
}

function gettingUserProfileFailure (errorMessage: string): UsersAction & { errorMessage: string } {
  return {
    type: actions.GETTING_USER_PROFILE_FAILURE,
    errorMessage
  };
}

export {
  gettingUserProfile,
  gettingUserProfileSuccess,
  gettingUserProfileFailure,
}