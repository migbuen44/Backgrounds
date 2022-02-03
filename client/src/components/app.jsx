import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './home/home';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </Router>
);

export default App;
