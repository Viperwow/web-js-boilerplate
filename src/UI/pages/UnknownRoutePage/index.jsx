import loadable from 'src/common/loadable';

const DynamicUnknownRoutePage = loadable({
  importer: () => import('src/UI/pages/UnknownRoutePage/UnknownRoutePageConnector' /* webpackChunkName: "UnknownRoutePage" */), // eslint-disable-line max-len
});

export default DynamicUnknownRoutePage;
