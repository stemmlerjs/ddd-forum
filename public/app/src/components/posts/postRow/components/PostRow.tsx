
import React from 'react';
import "../styles/PostRow.sass"
import moment from 'moment'
import { Post } from '../../../../models/Post';
import { PostPoints } from '../../postPoints';

interface PostRowProps extends Post {

}

const PostRow: React.FC<PostRowProps> = (props) => (
  <div className="post-row">
    <PostPoints points={props.points}/>
    <div className="post-row-content">
      <a href={props.slug} className="title">"{props.title}"</a>
      <div className="post-row-meta">
        {moment(props.createdAt).fromNow()} | {`by `} <a href={`/author/${props.postAuthor}`}>{props.postAuthor}</a> | {`${props.numComments} comments`}
      </div>
    </div>
  </div>
)

export default PostRow;