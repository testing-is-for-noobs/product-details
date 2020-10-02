import React from 'react';
import styles from '../css/styles.css';
import StoreSelect from './StoreSelect';

const Stock = ({ status, expander, storeChanger, store, inventory, stores }) => {
  if (status === 0) {
    return (
      <div>
        <button type="button" className={styles.stock} onClick={expander}>
          <div className={styles.stockText}>Check Store Stock</div>
          <div className={styles.expander}>+</div>
        </button>
      </div>
    );
  }
  if (status === 1) {
    return (
      <div>
        <button type="button" className={`${styles.stock} ${styles.expanded}`} onClick={expander}>
          <div className={styles.stockText}>Check Store Stock</div>
          <div className={styles.expander}>-</div>
        </button>
        <div className={styles.storeHeader}>
          <div className={styles.storeHeaderText}>Closest Store</div>
          <div className={`${styles.info} ${styles.storeInfo}`}>i</div>
          <div className={styles.changeStore} onClick={storeChanger}>Change Store Location</div>
        </div>
        <StoreSelect stores={stores} />
        <div className={styles.store}>
          <div className={styles.storeTitle}>{store.name}</div>
          {inventory > 0 && (
            <div className={styles.storeStock}>In Stock at this time</div>
          )}
          {inventory <= 0 && (
            <div className={styles.storeStock}>Out of Stock</div>
          )}
          <div className={styles.storeDetails}>{store.address}</div>
          <div className={styles.storeDetails}>{`${store.city}, ${store.state} ${store.zip}`}</div>
          <div className={styles.seeStore}>See Store Details</div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.searchPanel}>
      <button type="button" className={`${styles.stock} ${styles.expanded}`} onClick={expander}>
        <div className={styles.stockText}>Check Store Stock</div>
        <div className={styles.expander}>-</div>
      </button>
      <div className={styles.storeHeader}>
        <span className={styles.findStoreText}>Enter your address to find a store near you.</span>
      </div>
      <input className={styles.storeSearch} placeholder="Enter a city and state or zip code" />
      <button className={styles.searchButton} type="button">
        &#x1F50D;
      </button>
    </div>
  );
};

export default Stock;
