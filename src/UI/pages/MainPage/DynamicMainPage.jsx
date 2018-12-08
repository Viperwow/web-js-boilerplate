// Vendors
import React from 'react';
// HoC
import loadable from 'src/common/loadable';

const DynamicMainPage = props => {
  const LoadedMainPage = loadable(
    import('src/UI/pages/MainPage/MainPageConnector' /* webpackChunkName: "MainPage" */),
  )();

  return <LoadedMainPage {...props} />;
};

export default DynamicMainPage;
