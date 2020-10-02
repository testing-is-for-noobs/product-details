import React from 'react';
import styles from '../css/styles.css';

const StoreSelect = ({ stores, toggleDrop, storeMenu }) => (
  <div>
    <button type="button" className={styles.storeSelect} onClick={toggleDrop}>
      {storeMenu === 'minimized' && (
        <div className={`${styles.storeSelectArrow} ${styles.down}`}>
          <svg width="12px" height="19px" viewBox="0 0 18 28" aria-hidden="true">
            <path d="M1.825 28L18 14 1.825 0 0 1.715 14.196 14 0 26.285z" fill="#757575" />
          </svg>
        </div>
      )}
      {storeMenu === 'expanded' && (
        <div className={`${styles.storeSelectArrow} ${styles.up}`}>
          <svg width="12px" height="19px" viewBox="0 0 18 28" aria-hidden="true">
            <path d="M1.825 28L18 14 1.825 0 0 1.715 14.196 14 0 26.285z" fill="#757575" />
          </svg>
        </div>
      )}
      <div className={styles.storeSelectHeader}>Select a Store</div>
      {stores[0].name}
    </button>
    {storeMenu === 'expanded' && (
      <div>menu</div>
    )}
  </div>
);

export default StoreSelect;
