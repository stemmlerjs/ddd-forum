
import React from 'react'
import moment from 'moment'
import { Comment } from '../../../../models/Comment'

interface PostCommentAuthorAndTextProps extends Comment {

}

const PostCommentAuthorAndText: React.FC<PostCommentAuthorAndTextProps> = (props) => (
  <div>
    <div className="comment-meta">
      {props.member.username} | <a href={`/comment/${props.commentId}`}>{moment(props.createdAt).fromNow()}</a>
    </div>
    <p className="comment-text"><b dangerouslySetInnerHTML={{ __html: props.text }}/></p>
  </div>
)

export default PostCommentAuthorAndText