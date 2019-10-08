
import React from 'react'
import { Layout } from '../shared/layout'
import { toast } from 'react-toastify';
import { OnboardTemplate } from '../modules/users/components/onboarding/onboardTemplate'
import Header from '../shared/components/header/components/Header'
import { IUserOperators } from '../modules/users/redux/operators';
import { UsersState } from '../modules/users/redux/states';
//@ts-ignore
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as usersOperators from '../modules/users/redux/operators'
import withLoginHandling from '../modules/users/hocs/withLoginHandling';

interface LoginPageProps extends IUserOperators {
  users: UsersState;
  history: any;
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
      password: '',
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
      toast.error("Yeahhhhh, you forgot to include username. 🤠", {
        autoClose: 3000
      })
      return false;
    }

    if (!!password === false) {
      toast.error("Yeahhhhh, you forgot to include your password 🤠", {
        autoClose: 3000
      })
      return false;
    }
    
    return true;
  }

  async onSubmit () {
    if (this.isFormValid()) {
      const { username, password } = this.state;
      this.props.login(username, password);
    }
  }

  render () {
    return (
      <Layout>
        <div className="header-container flex flex-row flex-center flex-even">
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

function mapStateToProps ({ users }: { users: UsersState }) {
  return {
    users
  };
}

function mapActionCreatorsToProps(dispatch: any) {
  return bindActionCreators(
    {
      ...usersOperators,
    }, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(
  withLoginHandling(LoginPage)
);
