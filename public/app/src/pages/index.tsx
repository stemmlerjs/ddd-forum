
import React from 'react';
import { Layout } from '../shared/layout';
import Header from '../shared/components/header/components/Header';
import { Button } from '../shared/components/button';
import PostFilters, { PostFilterType } from '../modules/forum/components/posts/filters/components/PostFilters';
import { Post } from '../modules/forum/models/Post';
import { DateUtil } from '../shared/utils/DateUtil';
import { PostRow } from '../modules/forum/components/posts/postRow';

const posts: Post[] = [
  { 
    title: "Where the hell do I even start with Domain-Driven Design?",
    createdAt: DateUtil.createPreviousDate(0, 0, 10),
    postAuthor: 'stemmlerjs',
    points: 143,
    numComments: 150,
    slug: '/discuss/where-to-do-ddd',
    comments: [],
    text: 'content goes here :)'
  },
  { 
    title: "Help with Aggregate Design",
    createdAt: DateUtil.createPreviousDate(0, 0, 15),
    postAuthor: 'jimmyuringer',
    points: 50,
    numComments: 60,
    slug: '/discuss/help-with-aggregate-design',
    comments: [],
    text: 'content goes here :)'
  },
  { 
    title: "CQRS Killed My App and I Don’t Like It",
    createdAt: DateUtil.createPreviousDate(0, 0, 30),
    postAuthor: 'wesbos',
    points: 42,
    numComments: 32,
    slug: '/discuss/cqrs-killed-my-app',
    comments: [],
    text: 'content goes here :)'
  },
  { 
    title: "Guys, it’s REDUX for DDD (Domain Events)",
    createdAt: DateUtil.createPreviousDate(0, 1, 0),
    postAuthor: 'danabramov',
    points: 12,
    numComments: 32,
    slug: '/discuss/ddd-redux',
    comments: [],
    text: 'content goes here :)'
  }
]

interface IndexPageState {
  activeFilter: PostFilterType;
}

class IndexPage extends React.Component<any, IndexPageState> {
  constructor (props: any) {
    super(props);

    this.state = {
      activeFilter: 'POPULAR'
    }
  }

  onClickJoinButton () {

  }

  setActiveFilter (filter: PostFilterType) {
    this.setState({
      ...this,
      activeFilter: filter
    })
  }

  render () {
    const { activeFilter } = this.state;

    return (
      <Layout>
        <div className="flex flex-row flex-center flex-even">
          <Header
            title="Domain-Driven Designers"
            subtitle="Where awesome Domain-Driven Designers are made"
          />
          <Button 
            text="Join" 
            onClick={() => this.onClickJoinButton()}
          />
        </div>
        <br/>
        <br/>

        <PostFilters
          activeFilter={activeFilter} 
          onClick={(filter) => this.setActiveFilter(filter)}
        />

        {posts.map((p, i) => (
          <PostRow key={i} {...p}/>
        ))}

      </Layout>
    )
  }
}

export default IndexPage;