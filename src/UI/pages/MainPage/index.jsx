// Vendors
import React, {Component} from 'react';
import i18n from 'i18next';

class MainPage extends Component {
  render() {
    return (
      <div className="page">
        {i18n.t('pages.main')}
      </div>
    );
  }
}

export default MainPage;
