import React from 'react';
import dynamic from 'src/common/dynamic';

const DynamicThirdPage = () => {
  const Component = dynamic(
    import('src/UI/pages/ThirdPage' /* webpackChunkName: "ThirdPage" */),
  );

  return <Component />;
};

export default DynamicThirdPage;
