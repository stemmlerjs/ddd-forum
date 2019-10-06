

import * as actionCreators from '../actionCreators'
import { usersService } from '../../services';

function createUser (email: string, username: string, password: string) {
  return async (dispatch: any, getState?: any) => {
    dispatch(actionCreators.creatingUser());

    const result = await usersService.createUser(email, username, password);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.creatingUserFailure(error))
    } else {
      dispatch(actionCreators.creatingUserSuccess());
    }
  };
}

export { createUser };
