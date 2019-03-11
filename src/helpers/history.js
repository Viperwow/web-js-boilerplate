import {createBrowserHistory} from 'history';

let _history = null;

export const initHistory = () => {
  _history = createBrowserHistory();
};
export const getHistory = () => _history;
