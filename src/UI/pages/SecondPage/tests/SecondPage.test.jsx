import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import SecondPage from '../SecondPage';

jest.unmock('../SecondPage');

describe('SecondPage component should render correctly', () => {
  test('With default props', () => {
    const output = shallow(<SecondPage />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });

  test('With text prop', () => {
    const output = shallow(<SecondPage text="text" />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });
});
