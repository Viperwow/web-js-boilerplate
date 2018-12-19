// Vendors
import React from 'react';
// HoC
import loadable from 'src/common/loadable';

const DynamicUnknownRoutePage = props => {
  const LoadedUnknownRoutePage = loadable(
    import('src/UI/pages/UnknownRoutePage/UnknownRoutePageConnector' /* webpackChunkName: "UnknownRoutePage" */), // eslint-disable-line max-len
  );

  return <LoadedUnknownRoutePage {...props} />;
};

export default DynamicUnknownRoutePage;
