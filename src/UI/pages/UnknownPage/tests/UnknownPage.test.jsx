import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import UnknownPage from '../UnknownPage';

jest.unmock('../UnknownPage');

describe('UnknownPage component should render correctly', () => {
  test('With default props', () => {
    const output = shallow(<UnknownPage />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });

  test('With text prop', () => {
    const output = shallow(<UnknownPage text="text" />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });
});
