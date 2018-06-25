// Vendors
import { hot } from 'react-hot-loader'; // Is being used to save React components state after HRM
import React, { Component } from 'react';
// Components
import Layout from 'src/components/Layout';

const NO_DATA_MESSAGE = 'Put_content_here';

class App extends Component {
  render() {
    return (
      <div className="root">
        <Layout>
          { NO_DATA_MESSAGE }
        </Layout>
      </div>
    );
  }
}

export default hot(module)(App);
