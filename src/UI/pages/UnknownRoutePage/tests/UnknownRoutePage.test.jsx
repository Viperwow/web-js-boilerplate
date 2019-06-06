import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import UnknownRoutePage from '../UnknownRoutePage';

jest.unmock('../UnknownRoutePage');

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
