
import React from 'react'
import { Logo } from '..';
import "../styles/Header.sass"

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = (props) => (
  <div className="header">
    <Logo/>
    <div className="content-container">
      <h1>{props.title}</h1>
      <p><b>{props.subtitle}</b></p>
    </div>
  </div>
)

export default Header;