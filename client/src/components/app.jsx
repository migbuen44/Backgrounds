import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './home';
import SpotifyLogin from './spotifyLogin';
import Login from './login';

const code = new URLSearchParams(window.location.search).get('code');

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        {!code ? <Redirect to="/spotifyLogin" /> : <Home />}
      </Route>
      <Route path="/spotifyLogin" component={SpotifyLogin} />
      <Route path="/login" component={Login} />
    </Switch>
  </Router>
);

export default App;
