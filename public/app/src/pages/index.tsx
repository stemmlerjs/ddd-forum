
import React from 'react';
import { Layout } from '../layout';
import Header from '../components/shared/header/components/Header';
import { Button } from '../components/shared/button';
import PostFilters, { PostFilterType } from '../components/posts/filters/components/PostFilters';

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

      </Layout>
    )
  }
}

export default IndexPage;