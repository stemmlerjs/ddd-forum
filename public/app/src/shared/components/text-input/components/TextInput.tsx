
import React from 'react'
import "../styles/TextInput.sass"

interface TextInputProps {
  placeholder: string;
  onChange: (val: string) => void;
  type: string;
  onEnterPress?: () => void;
}

const TextInput: React.FC<TextInputProps> = ({ placeholder, onChange, type, onEnterPress }) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyPressed = event.key;

    if (keyPressed === 'Enter' && onEnterPress) {
      onEnterPress();
    }
  };
  return (
    <input
      placeholder={placeholder}
      className="text-input"
      type={type ? type : "text"}
      onKeyPress={handleKeyPress}
      onChange={(e) => onChange(e.target.value)} />
  );
}

export default TextInput;