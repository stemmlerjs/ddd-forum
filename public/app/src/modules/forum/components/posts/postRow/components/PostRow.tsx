
import React from 'react';
import "../styles/PostRow.sass"
import { Post } from '../../../../models/Post';
import { PostPoints } from '../../postPoints';
import PostMeta from '../../post/components/PostMeta';

interface PostRowProps extends Post {
  
}

const PostRow: React.FC<PostRowProps> = (props) => (
  <div className="post-row">
    <PostPoints points={props.points}/>
    <PostMeta {...props} />
  </div>
)

export default PostRow;