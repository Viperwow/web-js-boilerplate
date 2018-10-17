import React from 'react';
import dynamic from 'src/common/dynamic';

const DynamicMainPage = () => {
  const Component = dynamic(
    import('src/UI/pages/MainPage' /* webpackChunkName: "MainPage" */),
  );

  return <Component />;
};

export default DynamicMainPage;
