// Vendors
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
// UI
import DynamicMainPage from 'src/UI/pages/MainPage/DynamicMainPage';
import DynamicSecondPage from 'src/UI/pages/SecondPage/DynamicSecondPage';
import DynamicThirdPage from 'src/UI/pages/ThirdPage/DynamicThirdPage';
import DynamicUnknownRoutePage from 'src/UI/pages/UnknownRoutePage/DynamicUnknownRoutePage';

class Layout extends Component {
  render() {
    return (
      <Router>
        <div className="layout">
          <Switch>
            <Redirect exact from="/" to="/1" />
            <Route exact path="/1" render={DynamicMainPage} />
            <Route exact path="/2" render={DynamicSecondPage} />
            <Route exact path="/3" render={DynamicThirdPage} />
            <Route render={DynamicUnknownRoutePage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Layout;
