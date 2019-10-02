
import React from 'react';
import { Layout } from '../layout';
import Header from '../components/shared/header/components/Header';
import { Button } from '../components/shared/button';
import PostFilters, { PostFilterType } from '../components/posts/filters/components/PostFilters';
import { Post } from '../models/Post';
import { DateUtil } from '../utils/DateUtil';
import { PostRow } from '../components/posts/postRow';

const posts: Post[] = [
  { 
    title: "Where the hell do I even start with Domain-Driven Design?",
    createdAt: DateUtil.createPreviousDate(0, 0, 10),
    postAuthor: 'stemmlerjs',
    points: 143,
    numComments: 150
  },
  { 
    title: "Help with Aggregregate Design",
    createdAt: DateUtil.createPreviousDate(0, 0, 15),
    postAuthor: 'jimmyuringer',
    points: 50,
    numComments: 60
  }
]


interface IndexPageProps {

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
    console.log(filter);
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