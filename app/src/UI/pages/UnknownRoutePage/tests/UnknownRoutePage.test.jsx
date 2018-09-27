// Vendors
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
// UI
import UnknownRoutePage from '..';

describe('UnknownRoutePage component should render correctly', () => {
  test('With default props', () => {
    const output = shallow(<UnknownRoutePage />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });
});
