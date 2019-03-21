import loadable from 'src/common/loadable';

const DynamicMainPage = loadable({
  importer: () => import('src/UI/pages/MainPage/MainPageConnector' /* webpackChunkName: "MainPage" */), // eslint-disable-line max-len
});

export default DynamicMainPage;
