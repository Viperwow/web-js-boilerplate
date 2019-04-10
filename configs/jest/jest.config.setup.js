import {configure} from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import Adapter from 'enzyme-adapter-react-16'; // eslint-disable-line import/no-extraneous-dependencies
import registerRequireContextHook from 'babel-plugin-require-context-hook/register'; // eslint-disable-line import/no-extraneous-dependencies

configure({adapter: new Adapter()});
registerRequireContextHook();
