// Vendors
import React, {Component} from 'react';

class SecondPage extends Component {
  render() {
    const {text} = this.props;

    return (
      <div className="page">
        {text}
      </div>
    );
  }
}

export default SecondPage;
