
import React from 'react';
import { usersService } from '../../../shared/domain/users';

function withUsersService (WrappedComponent: any) {
  class HOC extends React.Component {
    render () {
      return (
        <WrappedComponent
          {...this.props}
          usersService={usersService}
        />
      );
    }
  }
  return HOC;
}

export default withUsersService;