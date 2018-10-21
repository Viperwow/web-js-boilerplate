// HoC
import loadable from 'src/common/loadable';

const DynamicUnknownRoutePage = loadable(
  import('src/UI/pages/UnknownRoutePage' /* webpackChunkName: "UnknownRoutePage" */),
);

export default DynamicUnknownRoutePage;
