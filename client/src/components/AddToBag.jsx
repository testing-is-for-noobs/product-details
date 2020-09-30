import React from 'react';
import styles from '../css/styles.css';

const AddToBag = ({ limit, quantity, changeHandler }) => {
  const customerLimit = limit;
  return (
    <div className={styles.bag}>
      <button type="button" className={`${styles.bagAdjust} ${styles.minus}`}>-</button>
      <input type="text" value={quantity} className={styles.bagInput} onChange={(e) => { changeHandler(e.target.value); }} />
      <button type="button" className={`${styles.bagAdjust} ${styles.plus}`}>+</button>
      <div className={styles.customerLimit}>
        {`Limit ${customerLimit}`}
        <span className={styles.info}>&#9432;</span>
      </div>
      <button type="submit" className={styles.addToBag}>Add to Bag</button>
    </div>
  );
};

export default AddToBag;
