import React from 'react';
import dynamic from 'src/common/dynamic';

const DynamicUnknownRoutePage = () => {
  const Component = dynamic(
    import('src/UI/pages/UnknownRoutePage' /* webpackChunkName: "UnknownRoutePage" */),
  );

  return <Component />;
};

export default DynamicUnknownRoutePage;
