
import React from 'react'
import { Link } from "react-router-dom";
import "../styles/PostComment.sass"
import { Comment } from '../../../../models/Comment'
import PostCommentAuthorAndText from './PostCommentAuthorAndText';

interface PostCommentProps extends Comment {
  
}

const PostComment: React.FC<PostCommentProps> = (props) => (
  <div className="post-comment-container">
    <div className="post-comment">
      <PostCommentAuthorAndText
        {...props}
      />
      <Link to={`/comment/${props.commentId}`}>reply</Link>
    </div>
    <div className="indent">
      {props.childComments.length !== 0 && props.childComments.map((c, i) => (
        <PostComment {...c} key={i}/>
      ))}
    </div>
  </div>
)

export default PostComment;