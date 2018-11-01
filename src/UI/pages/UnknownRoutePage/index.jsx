// Vendors
import React, {Component} from 'react';
import i18n from 'i18next';

class UnknownRoutePage extends Component {
  render() {
    return (
      <div className="page">
        {i18n.t('pages.unknown')}
      </div>
    );
  }
}

export default UnknownRoutePage;
