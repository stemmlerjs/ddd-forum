
import React from 'react'
import { Layout } from '../shared/layout'
import { toast } from 'react-toastify';
import { OnboardTemplate } from '../modules/users/components/onboarding/onboardTemplate'
import Header from '../shared/components/header/components/Header'
import { UsersService } from '../modules/users/services/userService';
import { TextUtil } from '../shared/utils/TextUtil';
import { LoginDTO } from '../modules/users/dtos/loginDTO';
import withUsersService from '../modules/users/hocs/withUsersService';

interface LoginPageProps {
  usersService: UsersService;
}

interface LoginPageState {
  username: string;
  password: string;
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  constructor (props: LoginPageProps) {
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

  isFormValid = () => {
    const { username, password } = this.state;

    if (!!username === false) {
      toast.error("Yeahhhhh, you forgot your username. 🤠", {
        autoClose: 3000
      })
      return false;
    }

    if (!!password === false || !TextUtil.atLeast(password, 6)) {
      toast.error("Yeahhhhh, your password should be at least 6 chars 🤠", {
        autoClose: 3000
      })
      return false;
    }
    
    return true;
  }

  async onSubmit () {
    if (this.isFormValid()) {
      const { username, password } = this.state;  

      const loginResult = await this.props.usersService
        .login(username, password);

      if (loginResult.isLeft()) {
        return toast.error(`Yeahhhhh, ${loginResult.value} 🤠`, {
          autoClose: 3000
        })
      }

      try {
        const user = await this.props.usersService.getCurrentUserProfile();
      } catch (err) {
        console.log(err);
      }

      toast.success("You're in! 🤠", {
        autoClose: 3000
      })
    }
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

export default withUsersService(LoginPage);