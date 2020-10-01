import React from 'react';
import styles from '../css/styles.css';

const Similar = ({ cat1, cat2, cat3 }) => {
  const stock = ['Available now', 'Backorders accepted, will ship by October 8, 2020'];
  return (
    <div className={styles.similar}>
      <div>Shop more like this:</div>
      <div className={styles.categories}>
        <span>{cat1}</span>
        <span className={styles.category}>{cat2}</span>
        <span className={styles.category}>{cat3}</span>
      </div>
    </div>
  );
};

export default Similar;
