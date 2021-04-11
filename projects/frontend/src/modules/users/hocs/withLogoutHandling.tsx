
import React from 'react';
import { UsersState } from '../redux/states';
import { IUserOperators } from '../redux/operators';
import { toast } from 'react-toastify';

interface withLogoutHandlingProps extends IUserOperators {
  users: UsersState
}

function withLogoutHandling (WrappedComponent: any) {
  class HOC extends React.Component<withLogoutHandlingProps, any> {
    constructor (props: withLogoutHandlingProps) {
      super(props)
    }

    handleLogout () {
      this.props.logout();
    }

    afterSuccessfulLogout (prevProps: withLogoutHandlingProps) {
      const currentProps: withLogoutHandlingProps = this.props;
      if (currentProps.users.isLoggingOutSuccess && !prevProps.users.isLoggingOutSuccess) {
        return toast.success("Logged out! 🤠", {
          autoClose: 3000
        })
      }
    }

    afterFailedLogout (prevProps: withLogoutHandlingProps) {
      const currentProps: withLogoutHandlingProps = this.props;
      if (currentProps.users.isLoggingOutFailure && !prevProps.users.isLoggingOutFailure) {
        const error = currentProps.users.error;
        return toast.error(`Had some trouble logging out! ${error} 🤠`, {
          autoClose: 3000
        })
      }
    }

    componentDidUpdate (prevProps: withLogoutHandlingProps) {
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