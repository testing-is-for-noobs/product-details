import React from 'react';

const AddToBag = (props) => {
  return (
    <div className="bag">
      <div id="customer-limit">
        Limit {props.limit} <a id="info">&#9432;</a>
      </div>
      <button id="add-to-bag">Add to Bag</button>
    </div>
  );
};

export default AddToBag;
