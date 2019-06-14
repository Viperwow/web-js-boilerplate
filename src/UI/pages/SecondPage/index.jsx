import loadable from 'src/common/loadable';
import Loader from 'src/UI/components/Loader';

const DynamicSecondPage = loadable({
  importer: () => import('src/UI/pages/SecondPage/SecondPageConnector' /* webpackChunkName: "SecondPage" */), // eslint-disable-line max-len
  LoaderComponent: Loader,
});

export default DynamicSecondPage;
