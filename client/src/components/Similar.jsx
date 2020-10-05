import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/styles.css';

const Similar = ({ cat1, cat2, cat3 }) => (
  <div className={styles.similar}>
    <div>Shop more like this:</div>
    <div className={styles.categories}>
      <span className={styles.category}>{cat1}</span>
      <span className={`${styles.category} ${styles.nonFirst}`}>{cat2}</span>
      <span className={`${styles.category} ${styles.nonFirst}`}>{cat3}</span>
    </div>
  </div>
);

Similar.propTypes = {
  cat1: PropTypes.string.isRequired,
  cat2: PropTypes.string.isRequired,
  cat3: PropTypes.string.isRequired,
};

export default Similar;
