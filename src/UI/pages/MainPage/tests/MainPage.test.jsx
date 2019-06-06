import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import MainPage from '../MainPage';

jest.unmock('../MainPage');

describe('MainPage component should render correctly', () => {
  test('With default props', () => {
    const output = shallow(<MainPage />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });

  test('With text prop', () => {
    const output = shallow(<MainPage text="text" />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });
});
