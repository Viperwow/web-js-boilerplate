// HoC
import loadable from 'src/common/loadable';

const DynamicThirdPage = loadable(
  import('src/UI/pages/ThirdPage/ThirdPageConnector' /* webpackChunkName: "ThirdPage" */),
)();

export default DynamicThirdPage;
