import React from 'react';
import dynamic from 'src/common/dynamic';

const DynamicSecondPage = () => {
  const Component = dynamic(
    import('src/UI/pages/SecondPage' /* webpackChunkName: "SecondPage" */),
  );

  return <Component />;
};

export default DynamicSecondPage;
