
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
//@ts-ignore
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useUsers } from '../../domain/users/hooks/useUsers';
import { IUsersService } from '../../domain/users/services/userService';

interface UnAuthenticatedRouteProps {
  usersService: IUsersService;
  component: any;
  path: any;
}

/** 
 * This route is only visible to users who are not currently authenticted.
*/

const UnauthenticatedRoute: React.FC<UnAuthenticatedRouteProps> = ({ usersService, component: Component, ...rest }) => {
  // Add your own authentication on the below line.
  const users = useUsers(usersService);
  const isLoggedIn = users.operations.isAuthenticated();

  return (
    <Route
      {...rest}
      render={props =>
        !isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

//@ts-ignore
function mapStateToProps ({ users }: { users: UsersState }) {
  return {
    users
  };
}

function mapActionCreatorsToProps(dispatch: any) {
  return bindActionCreators(
    {

    }, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(
  UnauthenticatedRoute
);