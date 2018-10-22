// Vendors
import React, {Component} from 'react';
// Constants
const UNKNOWN_PAGE_PLACEHOLDER = 'UNKNOWN_PAGE_PLACEHOLDER';

class UnknownRoutePage extends Component {
  render() {
    return (
      <div className="page">
        {UNKNOWN_PAGE_PLACEHOLDER}
      </div>
    );
  }
}

export default UnknownRoutePage;
