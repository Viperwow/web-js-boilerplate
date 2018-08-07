// Vendors
import { hot } from 'react-hot-loader'; // Is being used to save React components state after HRM
import React, { Component } from 'react';
// Components
import Layout from 'src/components/Layout';
import Example from 'src/controllers/Example';
import Example2 from 'src/controllers/Example2';

const NO_DATA_MESSAGE = 'Put_content_here';

class App extends Component {
  render() {
    return (
      <div className="ny-app">
        <Layout>
          { NO_DATA_MESSAGE }
          { Example.mult(2, 2) }
          { Example2.mult(3, 3) }
        </Layout>
      </div>
    );
  }
}

export default hot(module)(App);
