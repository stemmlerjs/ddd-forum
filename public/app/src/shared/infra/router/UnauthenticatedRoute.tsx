
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
//@ts-ignore
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as usersOperators from '../../../modules/users/redux/operators'
import { UsersState } from '../../../modules/users/redux/states';

interface UnAuthenticatedRouteProps {
  users: UsersState;
  component: any;
  path: any;
}

/** 
 * This route is only visible to users who are not currently authenticted.
*/

const UnauthenticatedRoute: React.FC<UnAuthenticatedRouteProps> = ({ users, component: Component, ...rest }) => {
  // Add your own authentication on the below line.
  const isLoggedIn = users.isAuthenticated;

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

function mapStateToProps ({ users }: { users: UsersState }) {
  return {
    users
  };
}

function mapActionCreatorsToProps(dispatch: any) {
  return bindActionCreators(
    {
      ...usersOperators,
    }, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(
  UnauthenticatedRoute
);