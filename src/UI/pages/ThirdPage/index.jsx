// Vendors
import React, {Component} from 'react';
import i18n from 'i18next';
// Constants
const THIRD_PAGE_PLACEHOLDER = i18n.t('pages.third');

class ThirdPage extends Component {
  render() {
    return (
      <div className="page">
        {THIRD_PAGE_PLACEHOLDER}
      </div>
    );
  }
}

export default ThirdPage;
