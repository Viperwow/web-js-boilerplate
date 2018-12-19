// Vendors
import React from 'react';
// HoC
import loadable from 'src/common/loadable';

const DynamicSecondPage = props => {
  const LoadedSecondPage = loadable(
    import('src/UI/pages/SecondPage/SecondPageConnector' /* webpackChunkName: "SecondPage" */),
  );

  return <LoadedSecondPage {...props} />;
};

export default DynamicSecondPage;
