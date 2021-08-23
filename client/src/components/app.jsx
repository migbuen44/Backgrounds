import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './home';
import SpotifyLogin from './spotifyLogin';

const code = new URLSearchParams(window.location.search).get('code');

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        {!code ? <Redirect to="/spotifyLogin" /> : <Home />}
      </Route>
      <Route path="/spotifyLogin" component={SpotifyLogin} />
    </Switch>
  </Router>
);

export default App;
