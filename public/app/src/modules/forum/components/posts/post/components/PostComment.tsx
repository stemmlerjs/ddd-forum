
import React from 'react'
import { Link } from "react-router-dom";
import "../styles/PostComment.sass"
import { Comment } from '../../../../models/Comment'
import PostCommentAuthorAndText from './PostCommentAuthorAndText';
import { Points } from '../../points';

interface PostCommentProps extends Comment {
  onUpvoteClicked: () => void;
  onDownvoteClicked: () => void;
  isLoggedIn: boolean;
}

const PostComment: React.FC<PostCommentProps> = (props) => (
  <div className="comment">
    <Points
      points={props.points}
      onUpvoteClicked={() => props.onUpvoteClicked()}
      onDownvoteClicked={() => props.onDownvoteClicked()}
      isLoggedIn={props.isLoggedIn}
    />
    <div className="post-comment-container">
      <div className="post-comment">
        <PostCommentAuthorAndText
          {...props}
        />
        <Link to={`/comment/${props.commentId}`}>reply</Link>
      </div>
      <div className="indent">
        {props.childComments.length !== 0 && props.childComments.map((c, i) => (
          <PostComment
            {...c}
            key={i}
            onDownvoteClicked={props.onDownvoteClicked}
            onUpvoteClicked={props.onUpvoteClicked}
            isLoggedIn={props.isLoggedIn}
          />
        ))}
      </div>
    </div>
  </div>
)

export default PostComment;