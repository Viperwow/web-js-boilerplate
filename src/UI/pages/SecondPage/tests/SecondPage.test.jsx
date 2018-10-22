// Vendors
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
// UI
import SecondPage from '..';

describe('SecondPage component should render correctly', () => {
  test('With default props', () => {
    const output = shallow(<SecondPage />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });
});
