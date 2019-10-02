
import React from 'react';
import { Layout } from '../layout';
import Header from '../components/shared/header/components/Header';
import { Button } from '../components/shared/button';

interface IndexPageProps {

}

interface IndexPageState {

}

class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
  constructor (props: IndexPageProps) {
    super(props);
  }

  onClickJoinButton () {

  }

  render () {
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
        


      </Layout>
    )
  }
}

export default IndexPage;