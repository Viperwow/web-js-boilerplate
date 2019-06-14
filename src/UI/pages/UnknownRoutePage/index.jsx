import loadable from 'src/common/loadable';
import Loader from 'src/UI/components/Loader';

const DynamicUnknownRoutePage = loadable({
  importer: () => import('src/UI/pages/UnknownRoutePage/UnknownRoutePageConnector' /* webpackChunkName: "UnknownRoutePage" */), // eslint-disable-line max-len
  LoaderComponent: Loader,
});

export default DynamicUnknownRoutePage;
