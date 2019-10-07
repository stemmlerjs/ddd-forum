
import React from 'react'
import "../styles/PostSummary.sass"
import PostMeta from './PostMeta'
import { Post } from '../../../../models/Post'

interface PostProps extends Post {
  
}

const PostSummary: React.FC<PostProps> = (props) => (
  <div className="post">
    <PostMeta {...props} includeLink={false} />
    <div dangerouslySetInnerHTML={{ __html: props.text }}/>
  </div>
)

export default PostSummary;

