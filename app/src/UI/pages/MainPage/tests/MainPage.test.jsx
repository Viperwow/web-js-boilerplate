// Vendors
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
// UI
import MainPage from '..';

describe('MainPage component should render correctly', () => {
  test('With default props', () => {
    const output = shallow(<MainPage />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });
});
