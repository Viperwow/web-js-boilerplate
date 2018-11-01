// Vendors
import React, {Component} from 'react';
import i18n from 'i18next';

class SecondPage extends Component {
  render() {
    return (
      <div className="page">
        {i18n.t('pages.second')}
      </div>
    );
  }
}

export default SecondPage;
