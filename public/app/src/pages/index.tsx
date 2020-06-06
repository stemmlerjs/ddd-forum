
import React, { useState, useEffect } from 'react';
import { Layout } from '../shared/layout';
import Header from '../shared/components/header/components/Header';
import PostFilters, { PostFilterType } from '../modules/forum/components/posts/filters/components/PostFilters';
import { Post } from '../modules/forum/models/Post';
import { PostRows } from '../modules/forum/components/posts/postRows';
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
import withVoting from '../modules/forum/hocs/withVoting';
import { useLocation } from 'react-router-dom';

interface IndexPageProps extends usersOperators.IUserOperators, forumOperators.IForumOperations {
  users: UsersState;
  forum: ForumState;
  location: any;
}

interface IndexPageState {
  activeFilter: PostFilterType;
}

/**
 * @desc Pages are container components. They take user events from 
 * presentational components and pass them to interactors.
 */

function IndexPageContainer () {
  const [activeFilter, setActiveFilter] = useState<PostFilterType>('POPULAR');
  const location = useLocation()
  
  // Sets the filter 
  useEffect(() => {
    const showNewFilter = (location.search as string)
      .includes('show=new');
      
    if (showNewFilter) {
      setActiveFilter('NEW');
    }
  }, [location])  

  return (
    <Layout>
      <div className="header-container flex flex-row flex-center flex-even">
        <Header
          title="Domain-Driven Designers"
          subtitle="Where awesome Domain-Driven Designers are made"
        />
        <ProfileButton
          isLoggedIn={false}
          username={''}
          onLogout={() => {}}
        />
      </div>
      <br/>
      <br/>

      <PostFilters
        activeFilter={activeFilter}
        onClick={(filter) => setActiveFilter(filter)}
      />

      <PostRows
        activeFilter={activeFilter}
        isLoggedIn={false}
        upvotePost={() => {}}
        downvotePost={() => {}}
      />

    </Layout>
  )
}

class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
  constructor (props: IndexPageProps) {
    super(props);

    this.state = {
      activeFilter: 'POPULAR'
    }
  }

  getPosts () {
    const activeFilter = this.state.activeFilter;

    if (activeFilter === 'NEW') {
      this.props.getRecentPosts();
    } else {
      this.props.getPopularPosts();
    }
  }

  getPostsFromActiveFilterGroup (): Post[] {
    if (this.state.activeFilter === 'NEW') {
      return this.props.forum.recentPosts;
    } else {
      return this.props.forum.popularPosts;
    }
  }

  componentDidMount () {
    // this.setActiveFilterOnLoad();
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

        {/* <PostFilters
          activeFilter={activeFilter}
          onClick={(filter) => this.setActiveFilter(filter)}
        /> */}

        <PostRows
          activeFilter={activeFilter}
          isLoggedIn={this.props.users.isAuthenticated}
          upvotePost={this.props.upvotePost}
          downvotePost={this.props.downvotePost}
        />

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

export default IndexPageContainer;