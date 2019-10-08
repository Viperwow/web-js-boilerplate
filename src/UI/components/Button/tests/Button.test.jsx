import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Button from '../Button';

jest.unmock('../Button');

describe('Button component should render correctly', () => {
  test('With default props', () => {
    const output = shallow(<Button />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });

  test('With text prop', () => {
    const output = shallow(<Button text="text" />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });
});
