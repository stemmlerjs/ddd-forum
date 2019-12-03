
import React from 'react'
import "../styles/Button.sass"

interface ButtonProps {
  text: any;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  const handleEnterKey = (e: any) => {
    if (e.charCode == 13) {
      props.onClick()
    }
  }
  return (
    <div
      className="button"
      onClick={() => props.onClick() onKeyPress={handleEnterKey}}> { props.text }
  </div >
)
  }
export default Button;