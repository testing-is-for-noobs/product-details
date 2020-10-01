import React from 'react';
import styles from '../css/styles.css';

const Wishlist = ({ liked }) => (
  <div>
    <button type="button" className={styles.wishlist}>
      <div className={styles.circle}>
        <div className={styles.heart}>
          {liked}
        </div>
      </div>
      <div className={styles.wishlistText}>Add to Wishlist</div>
    </button>
  </div>
);

export default Wishlist;
