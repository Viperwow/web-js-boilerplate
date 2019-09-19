import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import App from '../App';

jest.unmock('../App');

describe('App component should render correctly', () => {
  test('With default props', () => {
    const output = shallow(<App />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });
});
