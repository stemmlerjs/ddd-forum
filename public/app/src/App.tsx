import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.sass';
import IndexPage from './pages';

const App: React.FC = () => {
  return (
    <Router>
      <Route path="/" exact component={IndexPage} />
    </Router>
  );
}

export default App;
