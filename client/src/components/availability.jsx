import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/styles.css';

const Availability = ({ onlineInv }) => {
  const stock = ['Available now', 'Backorders accepted, will ship by October 8, 2020'];
  return (
    <div className={styles.availability}>{stock[onlineInv]}</div>
  );
};

Availability.defaultProps = {
  onlineInv: PropTypes.number,
};

export default Availability;
