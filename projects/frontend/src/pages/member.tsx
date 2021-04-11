
import React from 'react'

export class MemberPage extends React.Component<any, any> {
  constructor (props: any) {
    super(props);
  }

  getUserName () {
    return this.props.match.params.username;
  }

  render () {
    const username = this.getUserName();
    return (
      <div>
        <h1>Member</h1>
        <h2>{username}</h2>
        <p>Nothing here just yet :p</p>
      </div>
    )
  }
}

export default MemberPage;