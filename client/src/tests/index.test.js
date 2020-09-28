import React from 'react';
import App from '../index';
import { shallow } from 'enzyme';

describe('App', () => {
  it('starts with product ID 1', () => {
    const wrapper = shallow(<App />);
    const pidState = wrapper.state().pid;
    expect(pidState).toEqual(1);
  });
});
