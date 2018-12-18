// Vendors
import React from 'react';
// HoC
import loadable from 'src/common/loadable';

const DynamicThirdPage = props => {
  const LoadedThirdPage = loadable(
    import('src/UI/pages/ThirdPage/ThirdPageConnector' /* webpackChunkName: "ThirdPage" */),
  );

  return <LoadedThirdPage {...props} />;
};

export default DynamicThirdPage;
