
import React from 'react'
import { Layout } from '../shared/layout';
import Header from '../shared/components/header/components/Header';
import { Post } from '../modules/forum/models/Post';
import { toast } from 'react-toastify';
import PostSummary from '../modules/forum/components/posts/post/components/PostSummary';
import PostComment from '../modules/forum/components/posts/post/components/PostComment';
import { Comment } from '../modules/forum/models/Comment';
import { BackNavigation } from '../shared/components/header';
import { CommentUtil } from '../modules/forum/utils/CommentUtil';
import { UsersState } from '../modules/users/redux/states';
//@ts-ignore
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as usersOperators from '../modules/users/redux/operators'
import { User } from '../modules/users/models/user';
import { ProfileButton } from '../modules/users/components/profileButton';
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';
import * as forumOperators from '../modules/forum/redux/operators'
import { ForumState } from '../modules/forum/redux/states';
import Editor from '../modules/forum/components/comments/components/Editor';
import { SubmitButton } from '../shared/components/button';
import { TextUtil } from '../shared/utils/TextUtil';
import { FullPageLoader } from '../shared/components/loader';
import withVoting from '../modules/forum/hocs/withVoting';
import { Points } from '../modules/forum/components/posts/points';

interface DiscussionPageProps extends usersOperators.IUserOperators, forumOperators.IForumOperations {
  users: UsersState;
  forum: ForumState;
  history: any;
}

interface DiscussionState {
  comments: Comment[];
  newCommentText: string;
}

class DiscussionPage extends React.Component<DiscussionPageProps, DiscussionState> {
  constructor (props: DiscussionPageProps) {
    super(props);

    this.state = {
      comments: [],
      newCommentText: '',
    }
  }

  getSlugFromWindow (): string {
    if (typeof window !== 'undefined') {
      var pathname = window.location.pathname;
      var slug = pathname.substring(pathname.lastIndexOf("/") + 1);
      return slug;
    } else {
      return "";
    }
  }

  getPost (): void {
    const slug = this.getSlugFromWindow();
    this.props.getPostBySlug(slug);
  }

  getComments (offset?: number): void {
    const slug = this.getSlugFromWindow();
    this.props.getComments(slug, offset);
  }

  componentDidMount () {
    this.getPost();
    this.getComments();
  }

  updateValue (fieldName: string, newValue: any) {
    this.setState({
      ...this.state,
      [fieldName]: newValue
    })
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

  onSubmitComment () {
    if (this.isFormValid()) {
      const text = this.state.newCommentText;
      const slug  = (this.props.forum.post as Post).slug;
      this.props.createReplyToPost(text, slug);
    }
  }

  afterSuccessfulCommentPost (prevProps: DiscussionPageProps) {
    const currentProps: DiscussionPageProps = this.props;
    if (currentProps.forum.isCreatingReplyToPostSuccess === !prevProps.forum.isCreatingReplyToPostSuccess) {
      toast.success(`Done-zo! 🤠`, {
        autoClose: 2000
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    }
  }

  afterFailedCommentPost (prevProps: DiscussionPageProps) {
    const currentProps: DiscussionPageProps = this.props;
    if (currentProps.forum.isCreatingReplyToPostFailure === !prevProps.forum.isCreatingReplyToPostFailure) {
      const error: string = currentProps.forum.error;
      return toast.error(`Yeahhhhh, ${error} 🤠`, {
        autoClose: 3000
      })
    }
  }

  componentDidUpdate (prevProps: DiscussionPageProps) {
    this.afterSuccessfulCommentPost(prevProps);
    this.afterFailedCommentPost(prevProps);
  }

  render () {
    const post = this.props.forum.post as Post;
    const comments = this.props.forum.comments;

    return (
      <Layout>
        <div className="header-container flex flex-row flex-center flex-between">
          <BackNavigation
            text="Back to all discussions"
            to="/"
          />
          <ProfileButton
            isLoggedIn={this.props.users.isAuthenticated}
            username={this.props.users.isAuthenticated ? (this.props.users.user as User).username : ''}
            onLogout={() => this.props.logout()}
          />
        </div>

        {this.props.forum.isGettingPostBySlug ? (
          ''
        ) : (
          <>

            <Header
              title={`"${post.title}"`}
              isUpvotable={true}
              onUpvoteClicked={() => this.props.upvotePost(post.slug)}
              onDownvoteClicked={() => this.props.downvotePost(post.slug)}
              points={post.points}
              isLoggedIn={this.props.users.isAuthenticated}
            />

            <br/>
            <br/>
            <PostSummary
              {...post as Post}
            />
            <h3>Leave a comment</h3>
            <Editor
              text={this.state.newCommentText}
              maxLength={CommentUtil.maxCommentLength}
              placeholder="Post your reply"
              handleChange={(v: any) => this.updateValue('newCommentText', v)}
            />
            <SubmitButton
              text="Post comment"
              onClick={() => this.onSubmitComment()}
            />
          </>
        )}

        <br/>
        <br/>
        <br/>
        {comments.map((c, i) => (
          <PostComment
            key={i}
            onDownvoteClicked={() => this.props.downvoteComment(c.commentId)}
            onUpvoteClicked={() => this.props.upvoteComment(c.commentId)}
            isLoggedIn={this.props.users.isAuthenticated}
            {...c}
          />
        ))}

        {this.props.forum.isCreatingReplyToPost ? <FullPageLoader/> : '' }
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
    withVoting(DiscussionPage)
  )
);
