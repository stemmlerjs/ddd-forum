
import React from 'react';
import { UsersState } from '../redux/states';
import { IUserOperators } from '../redux/operators';
import { toast } from 'react-toastify';

interface withUsersServiceProps extends IUserOperators {
  users: UsersState
}

function withLogoutHandling (WrappedComponent: any) {
  class HOC extends React.Component<withUsersServiceProps, any> {
    constructor (props: withUsersServiceProps) {
      super(props)
    }

    handleLogout () {
      this.props.logout();
    }

    afterSuccessfulLogout (prevProps: withUsersServiceProps) {
      const currentProps: withUsersServiceProps = this.props;
      if (currentProps.users.isLoggingOutSuccess && !prevProps.users.isLoggingOutSuccess) {
        return toast.success("Logged out! 🤠", {
          autoClose: 3000
        })
      }
    }

    afterFailedLogout (prevProps: withUsersServiceProps) {
      const currentProps: withUsersServiceProps = this.props;
      if (currentProps.users.isLoggingOutFailure && !prevProps.users.isLoggingOutFailure) {
        const error = currentProps.users.error;
        return toast.error(`Had some trouble logging out! ${error} 🤠`, {
          autoClose: 3000
        })
      }
    }

    componentDidUpdate (prevProps: withUsersServiceProps) {
      this.afterSuccessfulLogout(prevProps);
      this.afterFailedLogout(prevProps);
    }

    render () {
      return (
        <WrappedComponent
          logout={() => this.handleLogout()}
          {...this.props}
        />
      );
    }
  }
  return HOC;
}

export default withLogoutHandling;