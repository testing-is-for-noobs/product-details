import React from 'react';
import { shallow } from 'enzyme';
import Tag from '../components/Tag';

describe('Tag', () => {
  it('tag div text renders correctly', () => {
    const wrapper = shallow(<Tag />);
    const text = wrapper.find('#tag').text();
    expect(text).toEqual('Exclusives');
  });
});
