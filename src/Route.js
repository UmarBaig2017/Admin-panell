import React, { Component } from "react";
import { Route, Router } from "react-router-dom";
import AdminSignIn from "./components/Admin";
import Practitioner from "./components/PRACTITIONER";
import Parents from './components/Parents'
import Dashboard from "./components/dashboard"

import history from "./History";

// export const history = createBrowserHistory()

class Routers extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route  path="/signin" component={AdminSignIn} />
          <Route exact path="/" component={Dashboard} />
          <Route  path="/Practitioner" component={Parents} />
        </div>
      </Router>
    );
  }
}

export default Routers;
