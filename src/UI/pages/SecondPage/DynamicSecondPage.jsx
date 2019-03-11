import loadable from 'src/common/loadable';

const DynamicSecondPage = loadable({
  importer: import('src/UI/pages/SecondPage/SecondPageConnector' /* webpackChunkName: "SecondPage" */), // eslint-disable-line max-len
});

export default DynamicSecondPage;
