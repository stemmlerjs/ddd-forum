
import React from 'react'
import "../styles/TextInput.sass"

interface TextInputProps {
  placeholder: string;
  onChange: (val: string) => void;
  type: string;
}

const TextInput: React.FC<TextInputProps> = ({ placeholder, onChange, type }) => (
  <input 
    placeholder={placeholder}
    className="text-input" 
    type={type ? type : "text"}
    onChange={(e) => onChange(e.target.value)}
  />
)

export default TextInput;