
import React from 'react';
import { Layout } from '../shared/layout';
import Header from '../shared/components/header/components/Header';
import PostFilters, { PostFilterType } from '../modules/forum/components/posts/filters/components/PostFilters';
import { Post } from '../modules/forum/models/Post';
import { DateUtil } from '../shared/utils/DateUtil';
import { PostRow } from '../modules/forum/components/posts/postRow';
import { ProfileButton } from '../modules/users/components/profileButton';
import { UsersState } from '../modules/users/redux/states';
//@ts-ignore
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as usersOperators from '../modules/users/redux/operators'
import * as forumOperators from '../modules/forum/redux/operators'
import { User } from '../modules/users/models/user';
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';
import { ForumState } from '../modules/forum/redux/states';

const posts: Post[] = [
  { 
    type: 'text',
    title: "Where the hell do I even start with Domain-Driven Design?",
    createdAt: DateUtil.createPreviousDate(0, 0, 10),
    postAuthor: 'stemmlerjs',
    points: 143,
    numComments: 150,
    slug: '/discuss/where-to-do-ddd',
    text: 'content goes here :)'
  },
  { 
    type: 'text',
    title: "Help with Aggregate Design",
    createdAt: DateUtil.createPreviousDate(0, 0, 15),
    postAuthor: 'jimmyuringer',
    points: 50,
    numComments: 60,
    slug: '/discuss/help-with-aggregate-design',
    text: 'content goes here :)'
  },
  { 
    type: 'text',
    title: "CQRS Killed My App and I Don’t Like It",
    createdAt: DateUtil.createPreviousDate(0, 0, 30),
    postAuthor: 'wesbos',
    points: 42,
    numComments: 32,
    slug: '/discuss/cqrs-killed-my-app',
    text: 'content goes here :)'
  },
  { 
    type: 'text',
    title: "Guys, it’s REDUX for DDD (Domain Events)",
    createdAt: DateUtil.createPreviousDate(0, 1, 0),
    postAuthor: 'danabramov',
    points: 12,
    numComments: 32,
    slug: '/discuss/ddd-redux',
    text: 'content goes here :)'
  }
]

interface IndexPageProps extends usersOperators.IUserOperators, forumOperators.IForumOperations {
  users: UsersState;
  forum: ForumState;
  location: any;
}

interface IndexPageState {
  activeFilter: PostFilterType;
}

class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
  constructor (props: IndexPageProps) {
    super(props);

    this.state = {
      activeFilter: 'POPULAR'
    }
  }

  onClickJoinButton () {

  }

  setActiveFilter (filter: PostFilterType) {
    this.setState({
      ...this.state,
      activeFilter: filter
    })
  }

  onFilterChanged (prevState: IndexPageState) {
    const currentState: IndexPageState = this.state;
    if (prevState.activeFilter !== currentState.activeFilter) {
      const activeFilter = currentState.activeFilter;

      if (activeFilter === 'NEW') {
        this.props.getRecentPosts();
      } else {
        // TODO: Get popular posts
      }
    }
  }

  setActiveFilterOnLoad () {
    const showNewFilter = (this.props.location.search as string).includes('show=new');
    const showPopularFilter = (this.props.location.search as string).includes('show=popular');

    let activeFilter = this.state.activeFilter;

    if (showNewFilter) {
      activeFilter = 'NEW';
    }

    this.setState({
      ...this.state,
      activeFilter
    })
  }
  
  getPostsFromActiveFilterGroup (): Post[] {
    if (this.state.activeFilter === 'NEW') {
      return this.props.forum.recentPosts;
    } else {
      return this.props.forum.popularPosts;
    }
  }

  componentDidUpdate (prevProps: IndexPageProps, prevState: IndexPageState) {
    this.onFilterChanged(prevState)
  }

  componentDidMount () {
    this.setActiveFilterOnLoad();
  }

  render () {
    console.log(this.props)
    const { activeFilter } = this.state;

    return (
      <Layout>
        <div className="flex flex-row flex-center flex-even">
          <Header
            title="Domain-Driven Designers"
            subtitle="Where awesome Domain-Driven Designers are made"
          />
          <ProfileButton
            isLoggedIn={this.props.users.isAuthenticated}
            username={this.props.users.isAuthenticated ? (this.props.users.user as User).username : ''}
            onLogout={() => this.props.logout()}
          />
        </div>
        <br/>
        <br/>

        <PostFilters
          activeFilter={activeFilter} 
          onClick={(filter) => this.setActiveFilter(filter)}
        />

        {this.getPostsFromActiveFilterGroup().map((p, i) => (
          <PostRow key={i} {...p}/>
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
  withLogoutHandling(IndexPage)
);