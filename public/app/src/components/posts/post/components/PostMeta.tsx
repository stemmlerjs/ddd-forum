
import React from 'react'
import moment from 'moment';
import { Link } from "react-router-dom";
import { Post } from '../../../../models/Post'

interface PostMetaProps extends Post {

}

const PostMeta: React.FC<PostMetaProps> = (props) => (
  <div className="post-row-content">
    <Link to={props.slug} className="title">"{props.title}"</Link>
    <div className="post-row-meta">
      {moment(props.createdAt).fromNow()} | {`by `} <Link to={`/author/${props.postAuthor}`}>{props.postAuthor}</Link> | {`${props.numComments} comments`}
    </div>
  </div>
)

export default PostMeta;