// Vendors
import React, {Component} from 'react';
import i18n from 'i18next';
// Constants
const SECOND_PAGE_PLACEHOLDER = i18n.t('pages.second');

class SecondPage extends Component {
  render() {
    return (
      <div className="page">
        {SECOND_PAGE_PLACEHOLDER}
      </div>
    );
  }
}

export default SecondPage;
