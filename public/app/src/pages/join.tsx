
import React from 'react'
import { Layout } from '../shared/layout'
import Header from '../shared/components/header/components/Header'
import { toast } from 'react-toastify';
import { OnboardTemplate } from '../modules/users/components/onboarding/onboardTemplate'

interface JoinPageState {
  email: string;
  username: string;
  password: string;
}

class JoinPage extends React.Component<any, JoinPageState> {
  constructor (props: any) {
    super(props);

    this.state = {
      email: '',
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

  async onSubmit () {
    toast.success("Yeahhhhh", {
      autoClose: 3000
    })

    toast.error("Yeahhhhh", {
      autoClose: 3000
    })
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
          type="signup"
          updateFormField={(fieldName: string, val: string) => this.updateFormField(fieldName, val)}
          onSubmit={() => this.onSubmit()}
        />
      </Layout>
    )
  }
}

export default JoinPage;