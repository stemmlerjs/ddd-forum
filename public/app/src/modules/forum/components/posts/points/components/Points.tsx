
import React from 'react'
import "../styles/Point.sass"
import arrowSvg from "../assets/arrow.svg"
import PointHover from './PointHover'

interface PostPointsProps {
  points: number;
  onUpvoteClicked: () => void;
  onDownvoteClicked: () => void;
  isLoggedIn: boolean;
}

const Points: React.FC<PostPointsProps> = (props) => {
  const [isHover, setHover] = React.useState(false)

  return (
    <div className="post-points">
      <div
        onClick={() => props.onUpvoteClicked()}
        className="points-img-container upvote"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {!props.isLoggedIn && <PointHover isHover={isHover} />}
        <img src={arrowSvg}/>
      </div>
      <div>{props.points}</div>
      <div
        onClick={() => props.onDownvoteClicked()}
        className="points-img-container downvote"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img src={arrowSvg}/>
      </div>
    </div>
  )
}

export default Points;