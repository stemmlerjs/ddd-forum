
import { User } from "../models/user";

export interface UsersState {
  user: User | {};
  isAuthenticated: boolean;
  isFetchingUser: boolean;
  isFetchingUserSuccess: boolean;
  isFetchingUserFailure: boolean;

  isLoggingIn: boolean,
  isLoggingInSuccess: boolean,
  isLoggingInFailure: boolean,

  isLoggingOut: boolean;
  isLoggingOutSuccess: boolean;
  isLoggingOutFailure: boolean;

  error: string;
}

const initialUserState: UsersState = {
  user: {},
  isAuthenticated: false,
  isFetchingUser: false,
  isFetchingUserSuccess: false,
  isFetchingUserFailure: false,

  isLoggingIn: false,
  isLoggingInSuccess: false,
  isLoggingInFailure: false,

  isLoggingOut: false,
  isLoggingOutSuccess: false,
  isLoggingOutFailure: false,

  error: ''
}

export default initialUserState;
