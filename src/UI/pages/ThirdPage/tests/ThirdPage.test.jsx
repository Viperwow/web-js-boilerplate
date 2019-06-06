import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import ThirdPage from '../ThirdPage';

jest.unmock('../ThirdPage');

describe('ThirdPage component should render correctly', () => {
  test('With default props', () => {
    const output = shallow(<ThirdPage />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });

  test('With text prop', () => {
    const output = shallow(<ThirdPage text="text" />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });
});
