
import React from 'react'
import moment from 'moment';
import { Post } from '../../../../models/Post'

interface PostMetaProps extends Post {

}

const PostMeta: React.FC<PostMetaProps> = (props) => (
  <div className="post-row-content">
    <a href={props.slug} className="title">"{props.title}"</a>
    <div className="post-row-meta">
      {moment(props.createdAt).fromNow()} | {`by `} <a href={`/author/${props.postAuthor}`}>{props.postAuthor}</a> | {`${props.numComments} comments`}
    </div>
  </div>
)

export default PostMeta;