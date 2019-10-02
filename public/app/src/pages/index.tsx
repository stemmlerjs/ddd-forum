
import React from 'react';
import { Layout } from '../layout';
import Header from '../components/shared/header/components/Header';
import { Button } from '../components/shared/button';

type PostFilterType = 'POPULAR' | 'NEW';

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

        <div className="post-filters">
          <div className={`post-filter ${activeFilter === 'POPULAR' ? 'active' : ''}`}>Popular</div>
          <div className={`post-filter ${activeFilter === 'NEW' ? 'active' : ''}`}>New</div>
        </div>

      </Layout>
    )
  }
}

export default IndexPage;