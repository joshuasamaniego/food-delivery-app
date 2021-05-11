import React from 'react';
import Home from './components/Home';
import Order from './components/Order';
import Confirmation from './components/Confirmation';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <PrivateRoute path="/order" component={Order} />
          <PrivateRoute path="/confirmation" component={Confirmation} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
