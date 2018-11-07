// Vendors
import React, {Component} from 'react';

class MainPage extends Component {
  render() {
    const {text} = this.props;

    return (
      <div className="page">
        {text}
      </div>
    );
  }
}

export default MainPage;
