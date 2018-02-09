// Vendors
import { AppContainer } from 'react-hot-loader'; // Is being used to save React components state after HRM
import React from 'react';
import ReactDOM from 'react-dom';

// UI
import App from './components/App';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.querySelector('app'),
  );
};

render(App);

// Webpack Hot Module Replacement API in development mode
if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}
