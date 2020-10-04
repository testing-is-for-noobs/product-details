import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/styles.css';
import StoreSelect from './StoreSelect';

const Stock = ({
  status, expander, storeChanger, toggleDrop, storeMenuExpansion, selectStore, stores, nearbyStores,
  storeSearch, searchField, searchButton, store, sid, inventory, productInventory, validZip,
  detailsTooltip, handleTooltips,
}) => {
  if (status === 'minimized') {
    return (
      <div>
        <button type="button" className={styles.stock} onClick={expander}>
          <div className={styles.stockText}>Check Store Stock</div>
          <div className={styles.expander}>+</div>
        </button>
      </div>
    );
  }
  if (status === 'expanded') {
    return (
      <div className={styles.storeContainer}>

        <button type="button" className={`${styles.stock} ${styles.expanded}`} onClick={expander}>
          <div className={styles.stockText}>Check Store Stock</div>
          <div className={styles.expander}>-</div>
        </button>
        <div className={styles.storeHeader}>
          <div className={styles.storeHeaderText}>Closest Store</div>
          <button
            type="button"
            className={`${styles.info} ${styles.storeInfo}`}
            onClick={() => { handleTooltips('closest'); }}
          >
            i
          </button>

          <button
            className={styles.changeStore}
            onClick={storeChanger}
            type="button"
          >
            Change Store Location
          </button>
        </div>
        {validZip === true && (
          <div>
            <StoreSelect
              stores={stores}
              nearbyStores={nearbyStores}
              productInventory={productInventory}
              store={store}
              sid={sid}
              toggleDrop={toggleDrop}
              storeMenuExpansion={storeMenuExpansion}
              selectStore={selectStore}
            />
            <div className={styles.store}>
              {inventory > 0 && (
                <div className={`${styles.storeInventory} ${styles.inStock}`}>
                  <svg width="20px" height="13px" viewBox="0 0 20 13">
                    <path d="M0 5.703L7.177 13 20 0h-4.476L7.177 8.442 4.476 5.723H2.238z" fill="currentColor" fillRule="evenodd" />
                  </svg>
                </div>
              )}
              {inventory <= 0 && (
                <div className={`${styles.storeInventory} ${styles.outOfStock}`}>
                  <svg viewBox="0 0 17 17" width="17px" height="17px">
                    <path d="M10.377 8.142l5.953-5.954-2.234-2.234-5.954 5.954L2.188-.046-.046 2.188l5.954 5.954-5.954 5.954 2.234 2.234 5.954-5.953 5.954 5.953 2.234-2.234z" fill="currentColor" fillRule="evenodd" />
                  </svg>
                </div>
              )}
              <div className={styles.storeTitle}>{store.name}</div>
              {inventory > 0 && (
                <div className={styles.storeStock}>In Stock at this time</div>
              )}
              {inventory <= 0 && (
                <div className={styles.storeStock}>Out of Stock</div>
              )}
              <div className={styles.storeDetails}>{store.address}</div>
              <div className={styles.storeDetails}>{`${store.city}, ${store.state} ${store.zip}`}</div>
              <button
                type="button"
                className={styles.seeStore}
                onClick={() => { handleTooltips('details'); }}
              >
                See Store Details
              </button>
              {detailsTooltip === true && (
                <div>
                  <button type="button" className={styles.detailsTooltip} aria-label="button" onClick={() => { handleTooltips('details'); }} />
                  <div className={styles.detailsTooltipContainer}>
                    <img src={store.details} alt="store details" />
                    <button type="button" className={styles.detailsX} aria-label="button" onClick={() => { handleTooltips('details'); }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {validZip === false && (
          <div className={styles.noStoreFound}>
            No stores found within a 60-mile radius of your zip code
          </div>
        )}
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
      <div className={styles.searchContainer}>
        <input className={styles.storeSearch} placeholder="Enter zip code" onChange={(e) => { storeSearch(e.target.value); }} />
        <button type="button" className={styles.searchButton} onClick={() => { searchButton(searchField); }}>
          <svg width="18px" height="18px" viewBox="0 0 18 18">
            <path d="M18 16.615c0 .375-.137.7-.412.973a1.331 1.331 0 0 1-.973.412 1.28 1.28 0 0 1-.973-.412l-3.71-3.7a7.41 7.41 0 0 1-4.317 1.342c-1.03 0-2.017-.2-2.958-.6a7.616 7.616 0 0 1-2.434-1.623 7.605 7.605 0 0 1-1.622-2.433A7.472 7.472 0 0 1 0 7.616c0-1.032.2-2.018.6-2.96a7.65 7.65 0 0 1 1.623-2.433A7.616 7.616 0 0 1 4.657.601 7.49 7.49 0 0 1 7.615 0c1.032 0 2.018.2 2.959.601.94.4 1.752.941 2.434 1.622a7.624 7.624 0 0 1 1.622 2.434c.4.941.601 1.927.601 2.959a7.403 7.403 0 0 1-1.342 4.316l3.71 3.71c.267.266.401.592.401.973m-5.539-9c0-1.334-.474-2.475-1.423-3.423C10.09 3.244 8.95 2.77 7.615 2.77c-1.333 0-2.475.474-3.423 1.422C3.243 5.14 2.77 6.28 2.77 7.616c0 1.334.474 2.475 1.423 3.423.948.949 2.09 1.422 3.423 1.422 1.335 0 2.475-.473 3.423-1.422.95-.948 1.423-2.09 1.423-3.423" fill="#006DB7" fillRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

Stock.propTypes = {
  expander: PropTypes.func.isRequired,
  storeChanger: PropTypes.func.isRequired,
  toggleDrop: PropTypes.func.isRequired,
  selectStore: PropTypes.func.isRequired,
  storeSearch: PropTypes.func.isRequired,
  searchButton: PropTypes.func.isRequired,
  handleTooltips: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  storeMenuExpansion: PropTypes.string.isRequired,
  searchField: PropTypes.string.isRequired,
  sid: PropTypes.number.isRequired,
  store: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
    details: PropTypes.string,
  }).isRequired,
  stores: PropTypes.arrayOf(PropTypes.object).isRequired,
  nearbyStores: PropTypes.arrayOf(PropTypes.object).isRequired,
  productInventory: PropTypes.arrayOf(PropTypes.object).isRequired,
  inventory: PropTypes.number.isRequired,
  validZip: PropTypes.bool.isRequired,
  detailsTooltip: PropTypes.bool.isRequired,
};

export default Stock;
