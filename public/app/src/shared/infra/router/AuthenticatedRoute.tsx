
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { authService } from '../../../modules/users/services';

const AuthenticatedRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  // Add your own authentication on the below line.
  const isLoggedIn = authService.isAuthenticated();

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}


export default AuthenticatedRoute;