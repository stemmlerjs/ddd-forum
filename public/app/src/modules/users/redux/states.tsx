
import { User } from "../models/user";

export interface UsersState {
  user: User | {};
  isAuthenticated: boolean;
  isFetchingUser: boolean;
  isFetchingUserSuccess: boolean;
  isFetchingUserFailure: boolean;
}

const initialUserState: UsersState = {
  user: {},
  isAuthenticated: false,
  isFetchingUser: false,
  isFetchingUserSuccess: false,
  isFetchingUserFailure: false,
}

export default initialUserState;
