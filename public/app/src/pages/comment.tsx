
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

interface CommentState {
  comment: Comment | {};
  newCommentText: string;
  isGettingComment: boolean;
  isGettingCommentSuccess: boolean;
  isGettingCommentFailure: boolean;
}

interface CommentPageProps extends usersOperators.IUserOperators, forumOperators.IForumOperations {
  users: UsersState;
  forum: ForumState;
}

class CommentPage extends React.Component<CommentPageProps, CommentState> {
  constructor (props: any) {
    super(props);

    this.state = {
      comment: {},
      newCommentText: '',
      isGettingComment: false,
      isGettingCommentSuccess: false,
      isGettingCommentFailure: false,
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

  updateFetchState (
    isGettingComment: boolean,
    isGettingCommentSuccess: boolean,
    isGettingCommentFailure: boolean, cb?: Function): void {

      this.setState({
        ...this.state,
        isGettingComment,
        isGettingCommentSuccess,
        isGettingCommentFailure
      }, () => cb ? cb() : '')
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

  componentDidMount () {
    this.getComment();
  }

  async submitComment () {

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
                text="Submit"
                onClick={() => this.submitComment()}
              />
              <br/>
              <br/>
            </>
          )
        }

        
        

        {/* {comments.map((c, i) => (
          <PostComment key={i} {...c}/>
        ))} */}


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
  withLogoutHandling(CommentPage)
);
