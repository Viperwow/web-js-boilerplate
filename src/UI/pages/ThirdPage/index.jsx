import loadable from 'src/common/loadable';

const DynamicThirdPage = loadable({
  importer: () => import('src/UI/pages/ThirdPage/ThirdPageConnector' /* webpackChunkName: "ThirdPage" */), // eslint-disable-line max-len
});

export default DynamicThirdPage;
