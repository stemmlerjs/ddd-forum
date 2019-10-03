
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.sass';
import IndexPage from './pages';
import DiscussionPage from './pages/discussion';
import CommentPage from './pages/comment';

const App: React.FC = () => {
  return (
    <Router>
      <Route path="/" exact component={IndexPage} />
      <Route path="/discuss/:slug" component={DiscussionPage}/>
      <Route path="/comment/:commentId" component={CommentPage}/>
    </Router>
  );
}

export default App;

