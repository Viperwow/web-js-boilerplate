// Vendors
import React, {Component} from 'react';
import i18n from 'i18next';
// Constants
const MAIN_PAGE_PLACEHOLDER = i18n.t('pages.main');

class MainPage extends Component {
  render() {
    return (
      <div className="page">
        {MAIN_PAGE_PLACEHOLDER}
      </div>
    );
  }
}

export default MainPage;
