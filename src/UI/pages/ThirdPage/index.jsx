// Vendors
import React, {Component} from 'react';
import i18n from 'i18next';

class ThirdPage extends Component {
  render() {
    return (
      <div className="page">
        {i18n.t('pages.third')}
      </div>
    );
  }
}

export default ThirdPage;
