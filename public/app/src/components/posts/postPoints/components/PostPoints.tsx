
import React from 'react'
import "../styles/PostPoints.sass"
import arrowSvg from "../assets/arrow.svg"

interface PostPointsProps {
  points: number;
}

const PostPoints: React.FC<PostPointsProps> = (props) => (
  <div className="post-points">
    <div className="points-img-container">
      <img src={arrowSvg}/>
    </div>
    <div>{props.points}</div>
  </div>
)

export default PostPoints;