import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import ButtonWithIcon from '../ButtonWithIcon';

jest.unmock('../ButtonWithIcon');

describe('ButtonWithIcon component should render correctly', () => {
  test('With default props', () => {
    const output = shallow(<ButtonWithIcon />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });

  test('With text prop', () => {
    const output = shallow(<ButtonWithIcon text="text" />);

    expect(shallowToJson(output))
      .toMatchSnapshot();
  });
});
