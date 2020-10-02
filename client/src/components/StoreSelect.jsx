import React from 'react';
import styles from '../css/styles.css';

const StoreSelect = ({ stores, store, toggleDrop, storeMenu }) => (
  <div className={styles.selectContainer}>
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
      {store.name}
    </button>
    {storeMenu === 'expanded' && (
      <div className={styles.dropdown}>
        <div className={styles.dropdownItem}>Home</div>
        <div className={styles.dropdownItem}>About</div>
        <div className={styles.dropdownItem}>Contact</div>
      </div>
    )}
  </div>
);

export default StoreSelect;
