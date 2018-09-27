// Vendors
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
// UI
import ThirdPage from '..';

describe('ThirdPage component should render correctly', () => {
  test('With default props', () => {
    const output = shallow(<ThirdPage />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });
});
