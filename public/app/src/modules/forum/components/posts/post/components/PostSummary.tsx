
import React from 'react'
import "../styles/PostSummary.sass"
import PostMeta from './PostMeta'
import { Post } from '../../../../models/Post'
import { TextUtil } from '../../../../../../shared/utils/TextUtil'

interface PostProps extends Post {
  
}

const PostSummary: React.FC<PostProps> = (props) => (
  <div className="post">
    <PostMeta {...props} includeLink={false} />
    {!!props.text ? (
      <div dangerouslySetInnerHTML={{ __html: props.text }}/>
    ) : (
      <a className="link" target="_blank" href={props.link}>Click to visit the link at {TextUtil.getDomainNameFromUrl(props.link)}</a>
    )}
    
  </div>
)

export default PostSummary;

