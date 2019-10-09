
import React from 'react'
import "../styles/Point.sass"
import arrowSvg from "../assets/arrow.svg"

interface PostPointsProps {
  points: number;
  onUpvoteClicked: () => void;
  onDownvoteClicked: () => void;
}

const Points: React.FC<PostPointsProps> = (props) => (
  <div className="post-points">
    <div onClick={() => props.onUpvoteClicked()} className="points-img-container upvote">
      <img src={arrowSvg}/>
    </div>
    <div>{props.points}</div>
    <div onClick={() => props.onDownvoteClicked()} className="points-img-container downvote">
      <img src={arrowSvg}/>
    </div>
  </div>
)

export default Points;