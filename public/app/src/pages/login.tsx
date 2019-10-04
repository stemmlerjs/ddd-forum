
import React from 'react'
import { Layout } from '../shared/layout'
import { OnboardTemplate } from '../components/onboarding/onboardTemplate'
import Header from '../components/shared/header/components/Header'

interface LoginPageState {
  username: string;
  password: string;
}

class LoginPage extends React.Component<any, LoginPageState> {
  constructor (props: any) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  updateFormField (fieldName: string, value: string) {
    this.setState({
      ...this.state,
      [fieldName]: value
    })
  } 

  onSubmit () {
    
  }

  render () {
    return (
      <Layout>
        <div className="flex flex-row flex-center flex-even">
          <Header
            title="Domain-Driven Designers"
            subtitle="Where awesome Domain-Driven Designers are made"
          />
        </div>
        <OnboardTemplate
          type="login"
          updateFormField={(fieldName: string, val: string) => this.updateFormField(fieldName, val)}
          onSubmit={() => this.onSubmit()}
        />
      </Layout>
    )
  }
}

export default LoginPage;