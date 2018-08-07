// Vendors
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
// UI
import App from '../index';

describe('App component should render correctly', () => {
  test('With default props', () => {
    const output = shallow(<App />);

    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
