
import React from 'react'
import { Layout } from '../shared/layout'
import Header from '../shared/components/header/components/Header'
import { toast } from 'react-toastify';
import { OnboardTemplate } from '../modules/users/components/onboarding/onboardTemplate'
import withUsersService from '../modules/users/hocs/withUsersService';
import { UsersService } from '../modules/users/services/userService';
import { TextUtil } from '../shared/utils/TextUtil';
import { LoginDTO } from '../modules/users/dtos/loginDTO';
import { IUserOperators } from '../modules/users/redux/operators';

interface JoinPageProps extends IUserOperators {
  usersService: UsersService;
}

interface JoinPageState {
  email: string;
  username: string;
  password: string;
}

class JoinPage extends React.Component<JoinPageProps, JoinPageState> {
  constructor (props: JoinPageProps) {
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

  isFormValid = () => {
    const { email, username, password } = this.state;

    if (email === "" || email === undefined || !TextUtil.validateEmail(email)) {
      toast.error("Yeahhhhh, Want to try that again with a valid email? 🤠", {
        autoClose: 3000
      })
      return false;
    }

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
      const { email, username, password } = this.state;  

      const createUserResult = await this.props.usersService
        .createUser(email, username, password);

      if (createUserResult.isLeft()) {
        return toast.error(`Yeahhhhh, ${createUserResult.value} 🤠`, {
          autoClose: 3000
        })
      } 

      const loginResult = await this.props.usersService
        .login(username, password);

      if (loginResult.isLeft()) {
        return toast.error(`Yeahhhhh, ${loginResult.value} 🤠`, {
          autoClose: 3000
        })
      }

      const response: LoginDTO = loginResult.value.getValue();
      console.log(response);

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
          type="signup"
          updateFormField={
            (fieldName: string, val: string) => this.updateFormField(fieldName, val)
          }
          onSubmit={() => this.onSubmit()}
        />
      </Layout>
    )
  }
}

export default withUsersService(JoinPage);