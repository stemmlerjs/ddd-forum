
import React from 'react'
import { Comment } from '../modules/forum/models/Comment';
import { Layout } from '../shared/layout';
import Editor from '../modules/forum/components/comments/components/Editor';
import { SubmitButton } from '../shared/components/button';
import Header from '../shared/components/header/components/Header';
import { BackNavigation } from '../shared/components/header';
import PostCommentAuthorAndText from '../modules/forum/components/posts/post/components/PostCommentAuthorAndText';
import PostComment from '../modules/forum/components/posts/post/components/PostComment';
import { CommentUtil } from '../modules/forum/utils/CommentUtil';
import { UsersState } from '../modules/users/redux/states';
import { toast } from 'react-toastify';
//@ts-ignore
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as usersOperators from '../modules/users/redux/operators'
import { User } from '../modules/users/models/user';
import { ProfileButton } from '../modules/users/components/profileButton';
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';
import { ForumState } from '../modules/forum/redux/states';
import * as forumOperators from '../modules/forum/redux/operators'
import { Loader } from '../shared/components/loader';
import { TextUtil } from '../shared/utils/TextUtil';
import withVoting from '../modules/forum/hocs/withVoting';

interface CommentState {
  newCommentText: string;
  commentFetched: boolean;

}

interface CommentPageProps extends usersOperators.IUserOperators, forumOperators.IForumOperations {
  users: UsersState;
  forum: ForumState;
}

class CommentPage extends React.Component<CommentPageProps, CommentState> {
  constructor (props: any) {
    super(props);

    this.state = {
      commentFetched: false,
      newCommentText: ''
    }
  }

  getRawTextLength (tags: string) {
    return tags.replace(/<[^>]*>?/gm, '').length;
  }

  isFormReady () {
    const { newCommentText } = this.state;
    const commentTextLength = this.getRawTextLength(newCommentText);
    const commentIsOK = !!newCommentText === true
      && commentTextLength < CommentUtil.maxCommentLength
      && commentTextLength > CommentUtil.minCommentLength

    return commentIsOK;
  }

  updateValue (name: any, value: any) {
    this.setState({
      ...this.state,
      [name]: value
    })
  }

  getCommentIdFromWindow (): string {
    if (typeof window !== 'undefined') {
      var pathname = window.location.pathname;
      var slug = pathname.substring(pathname.lastIndexOf("/") + 1);
      return slug;
    } else {
      return "";
    }
  }

  getComment (): void {
    const commentId = this.getCommentIdFromWindow();
    this.props.getCommentByCommentId(commentId);
  }

  afterSuccessfulCommentPost (prevProps: CommentPageProps) {
    const currentProps: CommentPageProps = this.props;
    if (currentProps.forum.isCreatingReplyToCommentSuccess === !prevProps.forum.isCreatingReplyToCommentSuccess) {
      toast.success(`Done-zo! 🤠`, {
        autoClose: 2000
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    }
  }

  afterFailedCommentPost (prevProps: CommentPageProps) {
    const currentProps: CommentPageProps = this.props;
    if (currentProps.forum.isCreatingReplyToCommentFailure === !prevProps.forum.isCreatingReplyToCommentFailure) {
      const error: string = currentProps.forum.error;
      return toast.error(`Yeahhhhh, ${error} 🤠`, {
        autoClose: 3000
      })
    }
  }

  afterCommentFetched (prevProps: CommentPageProps) {
    const currentProps: CommentPageProps = this.props;
    if (
      currentProps.forum.isGettingCommentByCommentIdSuccess &&
      !this.state.commentFetched
    ) {

      this.setState({ ...this.state, commentFetched: true });
      const currentComment = this.props.forum.comment as Comment;
      this.props.getCommentReplies(currentComment.postSlug, currentComment.commentId);
    }
  }

  componentDidUpdate (prevProps: CommentPageProps) {
    this.afterCommentFetched(prevProps);
    this.afterSuccessfulCommentPost(prevProps);
    this.afterFailedCommentPost(prevProps);
  }

  componentDidMount () {
    this.getComment();
  }

  isFormValid () : boolean {
    const { newCommentText } = this.state;

    if (!!newCommentText === false ||
      TextUtil.atLeast(newCommentText, CommentUtil.minCommentLength) ||
      TextUtil.atMost(newCommentText, CommentUtil.maxCommentLength)
    ) {
      toast.error(`Yeahhhhh, comments should be ${CommentUtil.minCommentLength} to ${CommentUtil.maxCommentLength} characters. Yours was ${newCommentText.length}. 🤠`, {
        autoClose: 3000
      })
      return false;
    }

    return true;
  }

  async submitComment () {
    if (this.isFormValid()) {
      const text = this.state.newCommentText;
      const comment  = (this.props.forum.comment) as Comment;
      this.props.createReplyToComment(text, comment.commentId, comment.postSlug);
    }
  }

  render () {
    const comment = this.props.forum.comment as Comment;
    const isCommentFetched = this.props.forum.isGettingCommentByCommentIdSuccess;

    return (
      <Layout>
        <div className="header-container flex flex-row flex-center flex-even">
          <Header title={``} />
          {!isCommentFetched ? (
            <Loader/>
          ) : (
            <BackNavigation
              to={`/discuss/${comment.postSlug}`}
              text={`Back to "${comment.postTitle}"`}
            />
          )}
          <ProfileButton
            isLoggedIn={this.props.users.isAuthenticated}
            username={this.props.users.isAuthenticated ? (this.props.users.user as User).username : ''}
            onLogout={() => this.props.logout()}
          />
        </div>
        <br/>
        {
          !isCommentFetched ? (
            <div style={{ margin: '0 auto', textAlign: 'center' }}>
              <Loader/>
            </div>
          ) : (
            <>
              <PostCommentAuthorAndText {...comment}/>
              <br/>
              <br/>
              <Editor
                text={this.state.newCommentText}
                maxLength={CommentUtil.maxCommentLength}
                placeholder="Post your reply"
                handleChange={(v: any) => this.updateValue('newCommentText', v)}
              />
              <SubmitButton
                text="Submit reply"
                onClick={() => this.submitComment()}
              />
              <br/>
              <br/>
            </>
          )
        }

        {this.props.forum.comments.map((c, i) => (
          <PostComment
            key={i}
            onUpvoteClicked={() => this.props.upvoteComment(c.commentId)}
            onDownvoteClicked={() => this.props.downvoteComment(c.commentId)}
            isLoggedIn={this.props.users.isAuthenticated}
            {...c}
          />
        ))}

      </Layout>
    )
  }
}

function mapStateToProps ({ users, forum }: { users: UsersState, forum: ForumState }) {
  return {
    users,
    forum
  };
}

function mapActionCreatorsToProps(dispatch: any) {
  return bindActionCreators(
    {
      ...usersOperators,
      ...forumOperators
    }, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(
  withLogoutHandling(
    withVoting(CommentPage)
  )
);
