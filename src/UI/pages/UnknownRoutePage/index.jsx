// Vendors
import React, {Component} from 'react';
import i18n from 'i18next';
// Constants
const UNKNOWN_PAGE_PLACEHOLDER = i18n.t('pages.unknown');

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
