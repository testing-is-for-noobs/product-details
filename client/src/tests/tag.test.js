import React from 'react';
import Tag from '../components/tag';
import { shallow } from 'enzyme';

describe('Tag', () => {
  it('tag div text renders correctly', () => {
    const wrapper = shallow(<Tag />);
    const text = wrapper.find('#tag').text();
    expect(text).toEqual('Exclusives');
  });
});
