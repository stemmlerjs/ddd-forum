
import React from 'react'
import { Layout } from '../shared/layout'
import Header from '../shared/components/header/components/Header'
import { OnboardTemplate } from '../modules/users/components/onboarding/onboardTemplate'
import { useCreateUser } from '../modules/users/operations/mutations/createUser';

function JoinPageContainer () {
  const { createUser } = useCreateUser(); 
  return (
    <Layout>
      <div className="header-container flex flex-row flex-center flex-even">
        <Header
          title="Domain-Driven Designers"
          subtitle="Where awesome Domain-Driven Designers are made"
        />
      </div>
      <OnboardTemplate
        type="signup"
        onSubmit={({ email, username, password }) => createUser(email, username, password)}
      />
    </Layout>
  )
}

export default JoinPageContainer;
