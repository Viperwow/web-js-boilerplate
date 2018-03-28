// Vendors
import { hot } from 'react-hot-loader'; // Is being used to save React components state after HRM
import React, { Component } from 'react';

// Components
import Layout from 'src/components/Layout';

class App extends Component {
  render() {
    return (
      <div className="root">
        <Layout>
          Put_content_here
        </Layout>
      </div>
    );
  }
}

export default hot(module)(App);
