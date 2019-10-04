import React from 'react'
import arrow from '../assets/arrow.svg'
import { Link } from 'react-router-dom'
import "../styles/BackNavigation.sass"

interface BackNavigationProps {
  to: string;
  text: string;
}

const BackNavigation:React.FC<BackNavigationProps> = (props) => (
  <Link to={props.to} className="back-nav">
    <div className="arrow-container">
      <img src={arrow}/>
    </div>
    <p>{props.text}</p>
  </Link>
)

export default BackNavigation;