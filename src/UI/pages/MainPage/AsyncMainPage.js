import loadable from 'src/common/loadable';
import Loader from 'src/UI/components/Loader';

const DynamicMainPage = loadable({
  importer: () => import('src/UI/pages/MainPage/MainPageContainer' /* webpackChunkName: "MainPage" */), // eslint-disable-line max-len
  LoaderComponent: Loader,
});

export default DynamicMainPage;
