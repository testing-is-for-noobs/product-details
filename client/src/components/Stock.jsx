import React from 'react';
import styles from '../css/styles.css';

const Stock = ({ status, expander }) => {
  if (!status) {
    return (
      <div>
        <button type="button" className={styles.stock} onClick={expander}>
          <div className={styles.stockText}>Check Store Stock</div>
          <div className={styles.expander}>+</div>
        </button>
      </div>
    );
  }
  return (
    <div>
      <button type="button" className={styles.stock} onClick={expander}>
        <div className={styles.stockText}>Check Store Stock</div>
        <div className={styles.expander}>+</div>
      </button>
    </div>
  );
};

export default Stock;
