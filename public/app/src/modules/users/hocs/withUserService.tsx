
import React from 'react';
import { UsersService } from '../services/userService';

function withApiService (WrappedComponent: any) {
  class HOC extends React.Component {
    render () {
      const apiService = new UsersService();
      return (
        <WrappedComponent
          {...this.props}
          usersService={apiService}
        />
      );
    }
  }
  return HOC;
}

export default withApiService;