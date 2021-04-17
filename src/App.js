import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import index  from './pages/index';
import call  from './pages/callback';
import NoMatch  from './pages/404';
import me from './pages/me'

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={index} />
          <Route exact path="/callback" component={call} />
          <Route exact path="/me" component={me} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default App;
