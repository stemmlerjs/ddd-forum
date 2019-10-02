
import React from 'react'
import "../styles/Button.sass"

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = (props) => (
  <div 
    className="button"
    onClick={() => props.onClick()}>{props.text}
  </div>
)

export default Button;