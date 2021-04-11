
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IUsersService } from '../../domain/users/services/userService';
import { useUsers } from '../../domain/users/hooks/useUsers';

interface AuthenticatedRouteProps {
  usersService: IUsersService;
  component: any;
  path: any;
}

export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ usersService, component: Component, ...rest }) => {
  // Add your own authentication on the below line.
  const users = useUsers(usersService);
  const isLoggedIn = users.operations.isAuthenticated();

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