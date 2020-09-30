import React from 'react';
import styles from '../css/styles.css';

const Wishlist = ({ liked }) => {
  const chicken = '';
  return (
    <div className={styles.wishlist}>
      <button type="button">
        <div className={styles.circle}>
          <div className={styles.heart}>
            {liked}
          </div>
        </div>
      </button>
      <div className={styles.wishlistText}>Add to Wishlist</div>
    </div>
  );
};

export default Wishlist;
