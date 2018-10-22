// HoC
import loadable from 'src/common/loadable';

const DynamicSecondPage = loadable(
  import('src/UI/pages/SecondPage' /* webpackChunkName: "SecondPage" */),
)();

export default DynamicSecondPage;
