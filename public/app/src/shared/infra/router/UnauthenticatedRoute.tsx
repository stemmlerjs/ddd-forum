
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { usersService } from '../../../modules/users/services';

const UnauthenticatedRoute: React.FC<any> = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const isLoggedIn = usersService.isAuthenticated;

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


export default UnauthenticatedRoute;