import React from 'react';
import styles from '../css/styles.css';

const Reviews = (props) => {
  const { rating, count } = props;
  return (
    <div className="reviews">
      <div className={styles.stars}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
      <span className={styles.reviewText}>
        <span className={styles.reviewCount}>{`${count} `}</span>
        {`Reviews (${rating})`}
      </span>
    </div>
  );
};

export default Reviews;
