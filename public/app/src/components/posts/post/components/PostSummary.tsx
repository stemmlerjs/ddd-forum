
import React from 'react'
import "../styles/PostSummary.sass"
import PostMeta from './PostMeta'
import { Post } from '../../../../models/Post'

interface PostProps extends Post {
  
}

const PostSummary: React.FC<PostProps> = (props) => (
  <div className="post">
    <PostMeta {...props} />
    <p>{props.text}</p>
  </div>
)

export default PostSummary;

