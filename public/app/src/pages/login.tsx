
import React from 'react'
import { Layout } from '../shared/layout'
import { OnboardTemplate } from '../modules/users/components/onboarding/onboardTemplate'
import Header from '../shared/components/header/components/Header'
import { useLogin } from '../modules/users/operations/mutations/login';

/**
 * @desc This is a container component. It has no interaction logic and no component state.
 * It connects user events received from presentational components and passes them
 * to the model (interactor).
 */

function LoginPageContainer () {
  // The `login` method is an interactor (part of the model)
  const { login } = useLogin();
  
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
        onSubmit={({ username, password }) => login(username, password)}
      />
    </Layout>
  )
}

export default LoginPageContainer;
