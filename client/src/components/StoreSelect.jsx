import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/styles.css';

const StoreSelect = ({
  nearbyStores, productInventory, store, toggleDrop, storeMenuExpansion, selectStore,
}) => (
  <div className={styles.selectContainer}>
      <button type="button" className={styles.storeSelect} onClick={toggleDrop}>
        <div className={styles.storeSelectText}>
          <div className={styles.storeSelectHeader}>Select a Store</div>
          <div className={styles.storeSelectCurrent}>{store.name}</div>
        </div>
      {storeMenuExpansion === 'minimized' && (
        <div className={`${styles.storeSelectArrow} ${styles.down}`}>
          <svg width="12px" height="19px" viewBox="0 0 18 28" aria-hidden="true">
            <path d="M1.825 28L18 14 1.825 0 0 1.715 14.196 14 0 26.285z" fill="#757575" />
          </svg>
        </div>
      )}
      {storeMenuExpansion === 'expanded' && (
        <div className={`${styles.storeSelectArrow} ${styles.up}`}>
          <svg width="12px" height="19px" viewBox="0 0 18 28" aria-hidden="true">
            <path d="M1.825 28L18 14 1.825 0 0 1.715 14.196 14 0 26.285z" fill="#757575" />
          </svg>
        </div>
      )}
    </button>
    {storeMenuExpansion === 'expanded' && (
      <div className={styles.dropdown}>
        {nearbyStores.map((currentStore, i) => {
          const currentStoreInv = productInventory[currentStore.id - 1].inventory;
          return (
            <button type="button" className={styles.dropdownItem} key={currentStore.name} onClick={() => { selectStore(store, currentStore, i); }}>
              {currentStoreInv > 0 && (
                <div className={`${styles.dropStoreInventory} ${styles.inStock}`}>
                  <svg width="20px" height="13px" viewBox="0 0 20 13">
                    <path d="M0 5.703L7.177 13 20 0h-4.476L7.177 8.442 4.476 5.723H2.238z" fill="currentColor" fillRule="evenodd" />
                  </svg>
                </div>
              )}
              {currentStoreInv <= 0 && (
                <div className={`${styles.dropStoreInventory} ${styles.outOfStock}`}>
                  <svg viewBox="0 0 17 17" width="17px" height="17px">
                    <path d="M10.377 8.142l5.953-5.954-2.234-2.234-5.954 5.954L2.188-.046-.046 2.188l5.954 5.954-5.954 5.954 2.234 2.234 5.954-5.953 5.954 5.953 2.234-2.234z" fill="currentColor" fillRule="evenodd" />
                  </svg>
                </div>
              )}
              {currentStore.name}
            </button>
          );
        })}
      </div>
    )}
  </div>
);

StoreSelect.propTypes = {
  toggleDrop: PropTypes.func.isRequired,
  selectStore: PropTypes.func.isRequired,
  store: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  nearbyStores: PropTypes.arrayOf(PropTypes.object).isRequired,
  productInventory: PropTypes.arrayOf(PropTypes.object).isRequired,
  storeMenuExpansion: PropTypes.string.isRequired,
};

export default StoreSelect;
