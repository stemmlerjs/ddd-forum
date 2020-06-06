
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../styles/OnboardTemplate.sass"
import { TextInput } from '../../../../../../shared/components/text-input'
import { Button } from '../../../../../../shared/components/button'

type TemplateType = 'login' | 'signup';

interface OnboardingState {
  username: string,
  password: string,
  email: string
}

interface OnboardTemplateProps {
  type: TemplateType
  onSubmit: (onboardingState: OnboardingState) => void;
}

function getRedirectTextName (type: TemplateType): string {
  return type === 'login' ? 'Signup' : 'Login'
}

function getRedirectText (type: TemplateType): string {
  return type === 'signup' ? "already have an account?" : "don't have an account?"
}

function getRedirectLocation (type: TemplateType): string {
  return type === 'signup' ? '/login' : '/join'
} 

function getTitle (type: TemplateType) {
  return type === 'signup' ? 'Create account' : 'Log in'
}



const OnboardTemplate: React.FC<OnboardTemplateProps> = (props) => {
  const [onboardingState, setOnboardingState] = useState<OnboardingState>({ 
    username: '', 
    password: '',
    email: ''
  });

  const updateFormField = (fieldName: string, value: string) => {
    setOnboardingState({
      ...onboardingState,
      [fieldName]: value
    })
  }

  return (
    <div className="onboard-container">
      <p className="title">{getTitle(props.type)}</p>
      <br/>
      {props.type === 'signup' && <TextInput
        placeholder="email"
        onChange={(val: string) => updateFormField('email', val)}
        type="text"
      />}
      <TextInput
        placeholder="username"
        onChange={(val: string) => updateFormField('username', val)}
        type="text"
      />
      <TextInput
        placeholder="password"
        onChange={(val: string) => updateFormField('password', val)}
        type="password"
      />
      <br/>
      <div className="submit-container">
        <div className="message">
          <p>{getRedirectText(props.type)}</p>
          <Link to={getRedirectLocation(props.type)}>{getRedirectTextName(props.type)}</Link>
        </div>
        <Button text="Submit" onClick={() => props.onSubmit(onboardingState)}/>
      </div>
    </div>
  )
}

export default OnboardTemplate;