
import React from 'react'
import moment from 'moment'
import "../styles/PostComment.sass"
import { Comment } from '../../../../models/Comment'

interface PostCommentProps extends Comment {

}

const PostComment: React.FC<PostCommentProps> = (props) => (
  <div className="post-comment-container">
    <div className="post-comment">
      <div className="comment-meta">
        {props.postAuthor} | {moment(props.createdAt).fromNow()}
      </div>
      <p className="comment-text">{props.text}</p>
      <div className="reply-button">reply</div>
    </div>
    <div className="indent">
      {props.childComments.length !== 0 && props.childComments.map((c, i) => (
        <PostComment {...c} key={i}/>
      ))}
    </div>
  </div>
)

export default PostComment;