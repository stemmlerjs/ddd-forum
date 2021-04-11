
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

function loggingIn (): UsersAction {
  return {
    type: actions.LOGGING_IN
  };
}

function loggingInSuccess (): UsersAction {
  return {
    type: actions.LOGGING_IN_SUCCESS
  };
}

function loggingInFailure (error: string): UsersAction {
  return {
    type: actions.LOGGING_IN_FAILURE,
    error
  };
}

function loggingOut (): UsersAction {
  return {
    type: actions.LOGGING_OUT
  };
}

function loggingOutSuccess (): UsersAction {
  return {
    type: actions.LOGGING_OUT_SUCCESS
  };
}

function loggingOutFailure (error: string): UsersAction {
  return {
    type: actions.LOGGING_OUT_FAILURE,
    error
  };
}

function creatingUser (): UsersAction {
  return {
    type: actions.CREATING_USER
  };
}

function creatingUserSuccess (): UsersAction {
  return {
    type: actions.CREATING_USER_SUCCESS
  };
}

function creatingUserFailure (error: string): UsersAction {
  return {
    type: actions.CREATING_USER_FAILURE,
    error
  };
}

export {
  gettingUserProfile,
  gettingUserProfileSuccess,
  gettingUserProfileFailure,

  loggingIn,
  loggingInSuccess,
  loggingInFailure,

  loggingOut,
  loggingOutSuccess,
  loggingOutFailure,

  creatingUser,
  creatingUserSuccess,
  creatingUserFailure
}