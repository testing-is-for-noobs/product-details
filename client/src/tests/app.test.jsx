import React from 'react';
import { shallow } from 'enzyme';
import App from '../components/App';

describe('App', () => {
  it('App shallow wrapper should have a length of 1', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.length).toEqual(1);
  });
});

/*
TEST 1:     Product Details container should be rendered.
Procedure:  yarn run server. yarn run react. Open 'http://localhost:8080/' in browser.
Result:     Pass

TEST 2:     Tag, product line, product title, review rating, review count, price,
            online inventory status, and customer limit should be rendered.
Procedure:  All components should be displayed in the correct locations. Use lego.com for reference.
Result:     Pass

TEST 3:     The number of stars should be rendered dynamically based on the review rating.
Procedure:  Visual star rating should match the float rating in parentheses
Result:     Pass

TEST 4:     Minus button should be disabled when quantity is 1 and enabled when quantity is more
            than 1. Plus button should be disabled when the quantity is at the limit displayed to
            the right side of the quantity adjuster widget.
Procedure:  Adjust the quantity and confirm the button is disabled at the endpoints by checking
            the button color and by hovering the cursor over buttons & looking for the cursor to
            change into a pointer. Only enabled buttons should produce the hover effect.
Result:     Pass

TEST 5:     Entering new quantities should only work when input values are greater than or equal to
            1 and less than or equal to the limit. Invalid input such as letters and symbols changes
            the displayed quantity back to the previous valid quantity. Numbers outside of the range
            will cause the quantity displayed to change to the closest valid quantity. For example,
            an input of 15 when the limit is 12 will result in the quantity displayed to be 12. An
            input of 0 will result in the quantity displayed to be 1.
Procedure:  Try entering several different letters and symbols after entering different valid
            quantities. Try entering different numbers outside of the valid range after entering
            different valid quantities. Confirm the behavior is consistent.
Result:     Pass

TEST 6:     Hovering the mouse over the product line, review text, and limit information circle
            should change cursor into a pointer. Limit information circle should become blue on
            hover.
Procedure:  Hover cursor on top of the product line (above title, below tag), review text (right
            side of review stars), and information circle to the right of limit quantity.
Result:     Pass

TEST 7:     Clicking the limit info button should display a modal that can be closed by
            clicking outside of the modal or clicking on the black X button at the top right of
            the modal.
Procedure:  Click the limit info button and try closing the modal with both methods.
Result:     Pass

TEST 8:     Hovering the mouse over the "Add to Bag" button should change the button from orange to
            white, but still retaining an orange border.
Procedure:  Hover cursor in multiple places on the orange "Add to Bag" button to confirm correct
            behavior.
Result:     Pass

TEST 9:     Hovering over the "Add to Wishlist" button or text should transform cursor into a
            pointer. Clicking will toggle the wishlist status of the product.
Procedure:  Hover and click on the button and text multiple times.
Result:     Pass

TEST 10:     Clicking the "Check Store Stock" bar should toggle the stock checker expansion. Hovering
            over this bar should transform the cursor into a pointer in both minimized and expanded
            panel states.
Procedure:  Click in multiple places on the "Check Store Stock" bar to expand and minimize the
            panel. Make sure the hover effect is consistent by moving on and off the bar in both
            minimized and expanded states.
Result:     Pass

TEST 11:    Hovering over the Closest Store info button should change it from gray to blue.
            Hovering over the "Change Store Location" or "See Store Details" blue text should
            underline the text. Hovering over each of the previously mentioned or hovering over the
            store selection dropdown menu button within the light gray rectangle should change the
            cursor into a pointer.
Procedure:  Hover cursor over the info button next to "Closest Store" and the 2 blue text links
            in this stock panel to confirm the color change and underline. Hover over all items to
            confirm the cursor transformation into a pointer.
Result:     Pass

TEST 12:    Clicking the closest store info button should display a modal that can be closed by
            clicking outside of the modal or clicking on the black X button at the top right of
            the modal.
Procedure:  Click the closest store info button and try closing the modal with both methods.
Result:     Pass

TEST 13:    Clicking the "See Store Details" blue text should display a modal that can be closed by
            clicking outside of the modal or clicking on the black X button at the top right of
            the modal. The background behind the
            modal should be a dark translucent grey.
Procedure:  Click the "See Store Details" blue text and confirm the background behind the modal is
            displaying correctly. Try closing the modal with both methods.
Result:     Pass

TEST 14:    The dropdown menu activated by clicking on the gray rectangle that contains the text
            "Select a Store" should display the current store name, matching the store name
            displayed directly below, to the right of the store inventory status indicator, a green
            check or a red X.
Procedure:  Confirm the 2 store names match. Confirm a store inventory status indicator is rendered
            to the left of the bottom store name. Confirm the store inventory status message below
            the bottom store name matches the store inventory status indicator. Refresh the page
            and expand the "Check Store Stock" panel several times to confirm this works every time.
Result:     Pass

TEST 15:    Clicking on the dropdown menu should reveal 2-5 additional stores, and none should match
            the current store that is displayed twice in the stock panel. Each of the 2-5 additional
            stores should have a stock indicator to the left of the store name.
Procedure:  Refresh the page, expand the "Check Store Stock" panel, and click the dropdown menu
            several times to confirm this is true every time.
Result:     Pass

TEST 16:    After clicking on the dropdown menu, clicking the current store again should minimize
            the dropdown menu. The current store should not change.
Procedure:  Click the dropdown menu and then click on the currently selected store several times.
Result:     Pass

TEST 17:    After the dropdown menu is clicked and the additional store options are displayed below,
            hovering over the displayed store options should transform the cursor into a pointer.
Procedure:  Expand the dropdown menu and move the mouse over the dropdown menu options to confirm
            the cursor becomes a pointer. Move the cursor on and off the list of options to confirm
            consistent behavior.
Result:     Pass

TEST 18:    After clicking on the dropdown menu, clicking on one of the stores below the current
            store should minimize the dropdown menu, update the current store to the clicked store,
            and add the previous store to the drop down menu options at the top of the list.
Procedure:  Try clicking on each of the dropdown menu options several times, in different order each
            time, to confirm the behavior is consistent each time.
Result:     Pass

TEST 19:    Clicking on the "Change Store Location" blue text should update the "Check Store Stock"
            panel to display a search bar with a search icon button on the right side and search
            directions above and within the bar.
Procedure:  Click the "Change Store Location" blue text and confirm the search panel is displayed
            correctly.
Result:     Pass

TEST 20:    Hovering over the "Check Store Stock" bar should still transform the cursor into a
            pointer. Hovering over the search button on the right side of the search bar should
            also transform the cursor into a pointer.
Procedure:  Hover over both areas to confirm the behavior.
Result:     Pass

TEST 21:    Clicking the "Check Store Stock" bar should minimize the panel to its original state.
            Clicking it again should display the expanded state with previously selected store, not
            the search panel.
Procedure:  Click the "Check Store Stock" bar, then click the "Change Store Location" blue text, and
            then click the "Check Store Stock" bar 2 more times. Repeat to confirm consistency.
Result:     Pass

TEST 22:    Entering a 5 digit number into the search bar and clicking the search button will change
            the search panel back to the expanded store panel with a new selection of stores in the
            dropdown menu.
Procedure:  Try several different 5 digit numbers to confirm this behavior is consistent.
Result:     Pass

TEST 23:    Entering any number other than a 5 digit number or any other string will result in an
            error message "No stores found within a 60-mile radius of your zip code".
Procedure:  Try several different numbers that are not 5 digits and several combinations of letters
            and symbols to confirm this behavior is consistent.
Result:     Pass

TEST 24:    When the error message "No stores found within a 60-mile radius of your zip code" is
            displayed, clicking the "Check Store Stock" bar should minimize the panel. Clicking
            again should display the error message again, not the previous stores and not the search
            panel. You must click "Change Store Location" to return to the search panel and enter a
            valid search.
Procedure:  Try an invalid search and then click on the "Check Store Stock" bar several times after
            the error message is displayed. Afterwards, click the "Change Store Location" to confirm
            the search panel is displayed.
Result: Pass

TEST 25:    Hovering over the 3 related categories in blue text below "Shop more like this:" in the
            bottom panel should transform the cursor into a pointer.
Procedure:  Hover over each of these 3 blue text categories to confirm the cursor transforms. Hover
            in between the categories to confirm the cursor transforms back into a mouse.
Result:     Pass
*/
