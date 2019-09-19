import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Apollo from '../Apollo';

jest.unmock('../Apollo');

describe('Apollo component should render correctly', () => {
  test('With default props', () => {
    const output = shallow(<Apollo />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });
});
