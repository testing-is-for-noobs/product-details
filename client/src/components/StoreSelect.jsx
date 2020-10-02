import React from 'react';
import styles from '../css/styles.css';

const StoreSelect = ({ stores }) => (
  <div>
    <button type="button" className={styles.storeSelect}>
      <div className={styles.storeSelectHeader}>Select a Store</div>
      {stores[0].name}
    </button>
  </div>
);

export default StoreSelect;
