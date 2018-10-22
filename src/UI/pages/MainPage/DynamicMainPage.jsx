// HoC
import loadable from 'src/common/loadable';

const DynamicMainPage = loadable(
  import('src/UI/pages/MainPage' /* webpackChunkName: "MainPage" */),
)();

export default DynamicMainPage;
