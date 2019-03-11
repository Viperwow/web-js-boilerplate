import loadable from 'src/common/loadable';

const DynamicMainPage = loadable({
  importer: import('src/UI/pages/MainPage/MainPageConnector' /* webpackChunkName: "MainPage" */),
});

export default DynamicMainPage;
