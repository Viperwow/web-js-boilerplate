// Vendors
import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
// UI
import MainPage from 'src/UI/pages/MainPage';
import SecondPage from 'src/UI/pages/SecondPage';
import ThirdPage from 'src/UI/pages/ThirdPage';
import UnknownRoutePage from 'src/UI/pages/UnknownRoutePage';

class Layout extends Component {
  render() {
    return (
      <Router>
        <div className="layout">
          <Switch>
            <Redirect exact from="/" to="/1" />
            <Route exact path="/1" component={MainPage} />
            <Route exact path="/2" component={SecondPage} />
            <Route exact path="/3" component={ThirdPage} />
            <Route component={UnknownRoutePage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Layout;
