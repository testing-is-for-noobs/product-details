import React from 'react';

const Availability = (props) => {
  const stock = ['Available now', 'Backorders accepted, will ship by October 8, 2020'];
  return (
    <div id="availability">{stock[props.onlineInv]}</div>
  );
};

export default Availability;
