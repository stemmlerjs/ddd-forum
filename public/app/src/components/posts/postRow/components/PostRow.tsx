
import React from 'react';
import "../styles/PostRow.sass"
import { Post } from '../../../../models/Post';

interface PostRowProps extends Post {

}

const PostRow: React.FC<PostRowProps> = (props) => (
  <div className="post-row">
    <div className="post-upvotes-container">

    </div>
    <div className="content">
      <p>{props.title}</p>
    </div>
  </div>
)

export default PostRow;