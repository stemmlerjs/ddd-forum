

import * as actionCreators from '../actionCreators'
import { usersService } from '../../services';

function getUserProfile () {
  return async (dispatch: any, getState?: any) => {
    dispatch(actionCreators.gettingUserProfile());
    try {
      const user = await usersService.getCurrentUserProfile();
      dispatch(actionCreators.gettingUserProfileSuccess(user));
    } 
    catch (err) {
      let message = '';
      console.log(err);
      dispatch(actionCreators.gettingUserProfileFailure(message));
    }
  };
}

export { getUserProfile };
