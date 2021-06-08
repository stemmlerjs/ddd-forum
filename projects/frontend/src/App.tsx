
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.sass';
import { IndexPage } from './pages/index/index.page';
import DiscussionPage from './pages/discussion';
import CommentPage from './pages/comment';
import LoginPage from './pages/login';
import JoinPage from './pages/join';
import { AuthenticatedRoute } from './shared/infra/router/AuthenticatedRoute';
import SubmitPage from './pages/submit';
import MemberPage from './pages/member';
import { usersService } from './shared/domain/users';
import { postService } from './shared/domain/posts/services';

const App: React.FC = () => {
  return (
    <Router>
      <Route path="/" exact render={
        () => <IndexPage postService={postService} userService={usersService}/>
      } />
      <Route path="/discuss/:slug" component={DiscussionPage}/>
      <Route path="/comment/:commentId" component={CommentPage}/>
      <Route path="/member/:username" component={MemberPage}/>
      <AuthenticatedRoute usersService={usersService} path="/submit" component={SubmitPage}/>
      <Route path="/join" component={JoinPage}/>
      <Route path="/login" component={LoginPage}/>
    </Router>
  );
}

export default App;

