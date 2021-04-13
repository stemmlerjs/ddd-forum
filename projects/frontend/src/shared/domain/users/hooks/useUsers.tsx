
import { useState } from "react";
import { User } from "../models/user";
import { IUsersService } from "../services/userService";

export function useUsers (usersService: IUsersService) {
  const [currentUser, setCurrentUser] = useState<User | {}>({});

  const isAuthenticated = () => {
    return currentUser.hasOwnProperty('username')
  }

  const createUser = async (email: string, username: string, password: string) => {
    // dispatch(actionCreators.creatingUser());
  
    const result = await usersService.createUser(email, username, password);

    if (result.isLeft()) {
      const error: string = result.value;
      // dispatch(actionCreators.creatingUserFailure(error))
    } else {
      // dispatch(actionCreators.creatingUserSuccess());
    }
  }

  const getUserProfile = async () => {
    // dispatch(actionCreators.gettingUserProfile());
    try {
      const user = await usersService.getCurrentUserProfile();
      // dispatch(actionCreators.gettingUserProfileSuccess(user));
    } 
    catch (err) {
      let message = '';
      console.log(err);
      // dispatch(actionCreators.gettingUserProfileFailure(message));
    }
  }

  const login = async (username: string, password: string) => {
    // dispatch(actionCreators.loggingIn());
  
    const result = await usersService.login(username, password);

    if (result.isLeft()) {
      const error: string = result.value;
      // dispatch(actionCreators.loggingInFailure(error))
    } else {
      // dispatch(actionCreators.loggingInSuccess());
    }
  }

  const logout = async () => {
    // dispatch(actionCreators.loggingOut());
  
    const result = await usersService.logout()

    if (result.isLeft()) {
      // dispatch(actionCreators.loggingOutFailure(result.value))
    } else {
      // dispatch(actionCreators.loggingOutSuccess());
    }
  }

  return {
    state: {
      user: currentUser,
    },
    operations: {
      isAuthenticated,
      logout
    }
  }
}