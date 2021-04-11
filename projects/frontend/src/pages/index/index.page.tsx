
import React, { useEffect, useState } from 'react';
import { Layout } from '../../shared/layout';
import Header from '../../shared/components/header/components/Header';
import PostFilters, { PostFilterType } from '../../modules/forum/components/posts/filters/components/PostFilters';
import { Post } from '../../modules/forum/models/Post';
import { PostRow } from '../../modules/forum/components/posts/postRow';
import { ProfileButton } from '../../modules/users/components/profileButton';
import { UsersState } from '../../modules/users/redux/states';
//@ts-ignore
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as usersOperators from '../../modules/users/redux/operators'
import * as forumOperators from '../../modules/forum/redux/operators'
import { User } from '../../modules/users/models/user';
import withLogoutHandling from '../../modules/users/hocs/withLogoutHandling';
import { ForumState } from '../../modules/forum/redux/states';
import withVoting from '../../modules/forum/hocs/withVoting';
import { useLocation } from 'react-router';

interface IndexPageProps extends usersOperators.IUserOperators, forumOperators.IForumOperations {
  users: UsersState;
  forum: ForumState;
  location: any;
}

interface IndexPageState {
  activeFilter: PostFilterType;
}

function usePosts () {
  
  const getRecentPosts = () => {};
  const getPopularPosts = () => {};

  return {
    operations: { getRecentPosts, getPopularPosts }
  }
}

function useUsers () {

}

function useIndexPage () {
  const location = useLocation()
  const [_activeFilter, _setActiveFilter] = useState<PostFilterType>('POPULAR');
  

  const setActiveFilter = (filter: PostFilterType) => {
    _setActiveFilter(filter);
  }

  const setFilterOnPageLoad = () => {
    const showNewFilter = (location.search as string).includes('show=new');

    let activeFilter: PostFilterType = _activeFilter;

    if (showNewFilter) {
      activeFilter = 'NEW';
    }

    setActiveFilter(activeFilter)
  }

  useEffect(setFilterOnPageLoad, []);
  
  return {
    models: { activeFilter: _activeFilter },
    operations: { setActiveFilter }
  }
}

export function IndexPage () {

  let activeFilter: PostFilterType = 'POPULAR'

  const setActiveFilter = (filter: PostFilterType) => {}
  const getPostsFromActiveFilterGroup = () => {
    return []
  }

  const props = {
    users: {
      isAuthenticated: false,
      user: {}
    },
    logout: () => {},
    upvotePost: (str: string) => {},
    downvotePost: (str: string) => {},
  }

  return (
    <Layout>
      <div className="header-container flex flex-row flex-center flex-even">
        <Header
          title="Domain-Driven Designers"
          subtitle="Where awesome Domain-Driven Designers are made"
        />
        <ProfileButton
          isLoggedIn={props.users.isAuthenticated}
          username={props.users.isAuthenticated ? (props.users.user as User).username : ''}
          onLogout={() => props.logout()}
        />
      </div>
      <br/>
      <br/>

      <PostFilters
        activeFilter={activeFilter}
        onClick={(filter) => setActiveFilter(filter)}
      />

      {getPostsFromActiveFilterGroup().map((p, i) => (
        <PostRow
          key={i}
          onUpvoteClicked={() => props.upvotePost('')}
          onDownvoteClicked={() => props.downvotePost('')}
          isLoggedIn={props.users.isAuthenticated}
          {...p}
        />
      ))}

    </Layout>
  )
}

class OldIndexPage extends React.Component<IndexPageProps, IndexPageState> {
  constructor (props: IndexPageProps) {
    super(props);

    this.state = {
      activeFilter: 'POPULAR'
    }
  }

  setActiveFilter (filter: PostFilterType) {
    this.setState({
      ...this.state,
      activeFilter: filter
    })
  }

  getPosts () {
    const activeFilter = this.state.activeFilter;

    if (activeFilter === 'NEW') {
      this.props.getRecentPosts();
    } else {
      this.props.getPopularPosts();
    }
  }

  onFilterChanged (prevState: IndexPageState) {
    const currentState: IndexPageState = this.state;
    if (prevState.activeFilter !== currentState.activeFilter) {
      this.getPosts();
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
    this.getPosts();
  }

  render () {
    console.log(this.props)
    const { activeFilter } = this.state;

    return (
      <Layout>
        <div className="header-container flex flex-row flex-center flex-even">
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
          <PostRow
            key={i}
            onUpvoteClicked={() => this.props.upvotePost(p.slug)}
            onDownvoteClicked={() => this.props.downvotePost(p.slug)}
            isLoggedIn={this.props.users.isAuthenticated}
            {...p}
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
    withVoting(OldIndexPage)
  )
);