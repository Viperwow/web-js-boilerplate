// Vendors
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
// UI
import Layout from '../index';

describe('Layout component should render correctly', () => {
  test('With default props', () => {
    const output = shallow(<Layout />);

    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
