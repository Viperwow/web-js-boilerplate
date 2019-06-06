import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Layout from '../Layout';

jest.unmock('../Layout');

describe('Layout component should render correctly', () => {
  test('With default props', () => {
    const output = shallow(<Layout />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });
});
