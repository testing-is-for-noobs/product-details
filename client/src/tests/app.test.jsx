import React from 'react';
import { shallow } from 'enzyme';
import App from '../components/App';

describe('App', () => {
  it('state begins with product ID 1', () => {
    const wrapper = shallow(<App />);
    const pidState = wrapper.state().pid;
    expect(pidState).toEqual(1);
  });
});

/*
Test coverage: Approximately 25% of front end code.

Test 1: Product Details container should be rendered.
Procedure: yarn run server. yarn run react. Open 'http://localhost:8080/' in browser.
Result: Pass

Test 2: Tag, product line, product title, review rating, review count, price,
        online inventory status, and customer limit should be rendered.
Procedure: Look at the Product Details component.
Result: Pass

Test 3: The number of stars should be rendered dynamically based on the review rating.
Procedure: Look at the rating in parentheses next to the review count. Count the stars.
Result: FAIL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Test 4: Minus button should be disabled when quantity is 1 and enabled when quantity is more than 1.
Procedure: Adjust quantity manually. Look at button color. Hover over button & look for pointer.
Result: Pass
*/
