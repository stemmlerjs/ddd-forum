
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.sass';
import IndexPage from './pages';
import DiscussionPage from './pages/discussion';
import CommentPage from './pages/comment';
import LoginPage from './pages/login';
import JoinPage from './pages/join';
import AuthenticatedRoute from './shared/infra/router/AuthenticatedRoute';
import SubmitPage from './pages/submit';
import MemberPage from './pages/member';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:5000/graphql',
  })
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route path="/" exact component={IndexPage} />
        <Route path="/discuss/:slug" component={DiscussionPage}/>
        <Route path="/comment/:commentId" component={CommentPage}/>
        <Route path="/member/:username" component={MemberPage}/>
        <AuthenticatedRoute path="/submit" component={SubmitPage}/>
        <Route path="/join" component={JoinPage}/>
        <Route path="/login" component={LoginPage}/>
      </Router>
    </ApolloProvider>
  );
}

export default App;

