import React, {Component} from 'react';
import {
  Redirect,
  Route,
  Router,
  Switch,
} from 'react-router-dom';
import DynamicMainPage from 'src/UI/pages/MainPage/DynamicMainPage';
import DynamicSecondPage from 'src/UI/pages/SecondPage/DynamicSecondPage';
import DynamicThirdPage from 'src/UI/pages/ThirdPage/DynamicThirdPage';
import DynamicUnknownRoutePage from 'src/UI/pages/UnknownRoutePage/DynamicUnknownRoutePage';
import {getHistory} from 'src/helpers/history';

class Layout extends Component {
  render() {
    return (
      <Router history={getHistory()}>
        <div className="layout">
          <Switch>
            <Redirect exact from="/" to="/1" />
            <Route exact path="/1" render={DynamicMainPage} />
            <Route exact path="/2" render={DynamicSecondPage} />
            <Route exact path="/3" render={DynamicThirdPage} />
            <Route exact path="/not-found" render={DynamicUnknownRoutePage} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Layout;
