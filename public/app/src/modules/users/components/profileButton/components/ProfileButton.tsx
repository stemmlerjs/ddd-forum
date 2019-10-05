
import React from 'react'
import { Button } from '../../../../../shared/components/button'

interface ProfileButtonProps {
  isLoggedIn: boolean;
  username: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = (props) => {
  return props.isLoggedIn ? (
    <Button 
      text={props.username}
      onClick={() => {}}
    />
  ) : (
    <Button 
      text="Join" 
      onClick={() => {}}
    />
  )
}

export default ProfileButton;