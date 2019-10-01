import React from 'react'
import "../styles/Button.sass"

interface ButtonProps {
  onClick: () => void;
  text: string;
  intent?: 'negative';
}

const Button: React.FC<ButtonProps> = (props) => (
  <button
    className={`button ${props.intent}`}
    onClick={props.onClick}
  >
    {props.text}
  </button>
)

export default Button;