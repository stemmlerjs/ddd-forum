
import React from 'react';
import { toast } from 'react-toastify';

/**
 * @desc Okay, I'm thinking about the best way to organize this type of logic.
 * This is logic that has to execute AFTER things have happened. I wonder if we can
 * keep the interaction layer clean and tidy by treating these as "Event Handlers".
 * These are things that we do in reaction to events. Perhaps it would be great if we
 * signalled particular events in a clean way that they could be typed. The event handler
 * would need to be somewhat global, wouldn't it?
 */


//@ts-ignore
interface withLoginHandlingProps extends IUserOperators {
  users: any
  history: any;
}

function withLoginHandling (WrappedComponent: any) {
  class HOC extends React.Component<withLoginHandlingProps, any> {
    constructor (props: withLoginHandlingProps) {
      super(props)
    }

    handleLogin (username: string, password: string) {
      //@ts-ignore
      this.props.login(username, password);
    }

    afterSuccessfulLogin (prevProps: withLoginHandlingProps) {
      const currentProps: withLoginHandlingProps = this.props;
      if (currentProps.users.isLoggingInSuccess && !prevProps.users.isLoggingInSuccess) {
        //@ts-ignore
        this.props.getUserProfile();
        setTimeout(() => { this.props.history.push('/')}, 3000)
        return toast.success("Logged in! 🤠", {
          autoClose: 3000
        })
      }
    }

    afterFailedLogin (prevProps: withLoginHandlingProps) {
      const currentProps: withLoginHandlingProps = this.props;
      if (currentProps.users.isLoggingInFailure && !prevProps.users.isLoggingInFailure) {
        const error = currentProps.users.error;
        return toast.error(`Had some trouble logging in! ${error} 🤠`, {
          autoClose: 3000
        })
      }
    }

    componentDidUpdate (prevProps: withLoginHandlingProps) {
      this.afterSuccessfulLogin(prevProps);
      this.afterFailedLogin(prevProps);
    }

    render () {
      return (
        <WrappedComponent
        // @ts-ignore
          login={(u: string, p: string) => this.handleLogin(u, p)}
          {...this.props}
        />
      );
    }
  }
  return HOC;
}

export default withLoginHandling;