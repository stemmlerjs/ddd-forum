
import React from 'react'
import Helmet from 'react-helmet';
import "./Layout.sass"
import { siteMetaData } from '../config/siteMetaData';

interface LayoutProps {

}

class Layout extends React.Component {
  constructor (props: LayoutProps) {
    super(props);
  }

  render () {
    return (
      <div className="app-layout">
        <div className="app-layout-inner">
          {
            //@ts-ignore
            <Helmet>
              <title>{siteMetaData.title}</title>
              {/* TODO: The rest */}
              <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,400i,500,700,700i&display=swap" rel="stylesheet"></link>
              <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css"></link>
            </Helmet>
          }
          
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout;