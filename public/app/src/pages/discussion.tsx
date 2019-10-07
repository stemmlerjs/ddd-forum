
import React from 'react'
import { Layout } from '../shared/layout';
import Header from '../shared/components/header/components/Header';
import { Post } from '../modules/forum/models/Post';
import { DateUtil } from '../shared/utils/DateUtil';
import PostSummary from '../modules/forum/components/posts/post/components/PostSummary';
import PostComment from '../modules/forum/components/posts/post/components/PostComment';
import { Comment } from '../modules/forum/models/Comment';
import { BackNavigation } from '../shared/components/header';
import { CommentUtil } from '../shared/utils/CommentUtil';
import { UsersState } from '../modules/users/redux/states';
//@ts-ignore
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as usersOperators from '../modules/users/redux/operators'
import { User } from '../modules/users/models/user';
import { ProfileButton } from '../modules/users/components/profileButton';
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';

const post: Post = { 
  title: "Where the hell do I even start with Domain-Driven Design?",
  createdAt: DateUtil.createPreviousDate(0, 0, 10),
  postAuthor: 'stemmlerjs',
  points: 143,
  numComments: 150,
  slug: '/discuss/where-to-do-ddd',
  type: 'text',
  text: `
    Despite the domain that they belong to, when domain events 
    are created and dispatched, they provide the opportunity 
    for other (decoupled) parts of our application to execute 
    some code after that event.
  `
}

const comments: Comment[] = [
  {
    commentId: '0',
    text: "Yeah yo, that's pretty cool and all but uhhh",
    postAuthor: "elonmusk",
    createdAt: DateUtil.createPreviousDate(0, 0, 10),
    childComments: [],
    postSlug: '/discuss/where-to-do-ddd',
  },
  {
    commentId: '1',
    text: `Great article dude. Here's a bunch of random text.
      Hello what's good? lkjsjjs lkjfksdjlf they provide the opportunity 
      for other (decoupled) parts of our application to execute 
      some code after that event.
    `,
    postAuthor: "elonmusk",
    createdAt: DateUtil.createPreviousDate(0, 0, 10),
    childComments: [],
    postSlug: '/discuss/where-to-do-ddd',
  },
  {
    commentId: '2',
    text: `Whoa, Elon Musk is on here?.
    `,
    parentCommentId: '0',
    postAuthor: "dondraper",
    createdAt: DateUtil.createPreviousDate(0, 0, 10),
    childComments: [],
    postSlug: '/discuss/where-to-do-ddd',
  },
  {
    commentId: '3',
    text: `Whoa, Don Draper is on here?.
    `,
    parentCommentId: '2',
    postAuthor: "tonysoprano",
    createdAt: DateUtil.createPreviousDate(0, 0, 10),
    childComments: [],
    postSlug: '/discuss/where-to-do-ddd',
  }
]

interface DiscussionPageProps extends usersOperators.IUserOperators {
  users: UsersState;
}

interface DiscussionState {
  comments: Comment[]
}

class DiscussionPage extends React.Component<DiscussionPageProps, DiscussionState> {
  constructor (props: DiscussionPageProps) {
    super(props);

    this.state = {
      comments: []
    }
  }

  async getCommentsFromAPI () {
    // TODO: Actually use an API for this :)
    this.setState({
      ...this.state,
      comments: comments
    })
  }

  componentDidMount () {
    this.getCommentsFromAPI();
  }

  render () {
    const comments = CommentUtil.getSortedComments(this.state.comments);
    return (
      <Layout>
        <div className="flex flex-row flex-center flex-between">
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

        <Header title={`"${post.title}"`} />
        
        <br/>
        <br/>
        <PostSummary
          {...post}
        />
        <br/>
        <br/>
        {comments.map((c, i) => (
          <PostComment key={i} {...c}/>
        ))}
      </Layout>
    )
  }
}

function mapStateToProps ({ users }: { users: UsersState }) {
  return {
    users
  };
}

function mapActionCreatorsToProps(dispatch: any) {
  return bindActionCreators(
    {
      ...usersOperators,
    }, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(
  withLogoutHandling(DiscussionPage)
);