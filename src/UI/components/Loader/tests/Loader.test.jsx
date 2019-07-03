import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Loader from '../Loader';

jest.unmock('../Loader');

describe('Loader component should render correctly', () => {
  test('With default props', () => {
    const output = shallow(<Loader />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });

  test('With text prop', () => {
    const output = shallow(<Loader text="text" />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });
});
