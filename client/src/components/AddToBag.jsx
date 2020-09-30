import React from 'react';
import styles from '../css/styles.css';

const AddToBag = ({ limit, quantity, changeHandler }) => {
  const customerLimit = limit;
  console.log(quantity);
  return (
    <div className={styles.bag}>
      {quantity > 1
        && <button type="button" className={`${styles.bagAdjust} ${styles.minus}`}>-</button>}
      {quantity <= 1
        && <button type="button" disabled="disabled" className={`${styles.bagAdjust} ${styles.minus} ${styles.disabled}`}>-</button>}
      <input
        type="text"
        value={quantity}
        className={styles.bagInput}
        onChange={(e) => { changeHandler(e.target.value); }}
      />
      {quantity < limit
        && <button type="button" className={`${styles.bagAdjust} ${styles.plus}`}>+</button>}
      {quantity >= limit
        && <button type="button" disabled="disabled" className={`${styles.bagAdjust} ${styles.plus} ${styles.disabled}`}>-</button>}
      <div className={styles.customerLimit}>
        {`Limit ${customerLimit}`}
        <span className={styles.info}>&#9432;</span>
      </div>
      <button type="submit" className={styles.addToBag}>Add to Bag</button>
    </div>
  );
};

export default AddToBag;
