import loadable from 'src/common/loadable';
import Loader from 'src/UI/components/Loader';

const DynamicUnknownPage = loadable({
  importer: () => import('src/UI/pages/UnknownPage/UnknownPageContainer' /* webpackChunkName: "UnknownPage" */), // eslint-disable-line max-len
  LoaderComponent: Loader,
});

export default DynamicUnknownPage;
