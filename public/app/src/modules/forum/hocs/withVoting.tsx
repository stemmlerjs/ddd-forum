
import React from 'react';
import { toast } from 'react-toastify';
import { IForumOperations } from '../redux/operators';
import { ForumState } from '../redux/states';

interface withVotingProps extends IForumOperations {
  users: ForumState;
}

function withVoting (WrappedComponent: any) {
  class HOC extends React.Component<withVotingProps, any> {
    constructor (props: withVotingProps) {
      super(props)
    }

    handleUpvoteComment (commentId: string) {
      this.props.upvoteComment(commentId);
    }

    handleDownvoteComment (commentId: string) {
      this.props.downvoteComment(commentId);
    }

    handleUpvotePost (postSlug: string) {
      this.props.upvotePost(postSlug)
    }

    handleDownvotePost (postSlug: string) {
      this.props.downvotePost(postSlug);
    }

    // afterSuccessfulLogin (prevProps: withVotingProps) {
    //   const currentProps: withLoginHandlingProps = this.props;
    //   if (currentProps.users.isLoggingInSuccess && !prevProps.users.isLoggingInSuccess) {
    //     this.props.getUserProfile();
    //     setTimeout(() => { this.props.history.push('/')}, 3000)
    //     return toast.success("Logged in! 🤠", {
    //       autoClose: 3000
    //     })
    //   }
    // }

    // afterFailedLogin (prevProps: withLoginHandlingProps) {
    //   const currentProps: withLoginHandlingProps = this.props;
    //   if (currentProps.users.isLoggingInFailure && !prevProps.users.isLoggingInFailure) {
    //     const error = currentProps.users.error;
    //     return toast.error(`Had some trouble logging in! ${error} 🤠`, {
    //       autoClose: 3000
    //     })
    //   }
    // }

    componentDidUpdate (prevProps: withVotingProps) {
      // this.afterSuccessfulLogin(prevProps);
      // this.afterFailedLogin(prevProps);
    }

    render () {
      return (
        <WrappedComponent
          upvoteComment={(commentId: string) => this.handleUpvoteComment(commentId)}
          downvoteComment={(commentId: string) => this.handleDownvoteComment(commentId)}
          upvotePost={(slug: string) => this.handleUpvotePost(slug)}
          downvotePost={(slug: string) => this.handleDownvotePost(slug)}
          {...this.props}
        />
      );
    }
  }
  return HOC;
}

export default withVoting;