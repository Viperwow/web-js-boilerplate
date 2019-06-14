import loadable from 'src/common/loadable';
import Loader from 'src/UI/components/Loader';

const DynamicThirdPage = loadable({
  importer: () => import('src/UI/pages/ThirdPage/ThirdPageConnector' /* webpackChunkName: "ThirdPage" */), // eslint-disable-line max-len
  LoaderComponent: Loader,
});

export default DynamicThirdPage;
