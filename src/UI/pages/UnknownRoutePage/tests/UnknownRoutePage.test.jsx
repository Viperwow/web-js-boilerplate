// Vendors
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
// UI
import UnknownRoutePage from '..';

jest.unmock('..');

describe('UnknownRoutePage component should render correctly', () => {
  test('With default props', () => {
    const output = shallow(<UnknownRoutePage />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });

  test('With text prop', () => {
    const output = shallow(<UnknownRoutePage text="text" />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });
});
