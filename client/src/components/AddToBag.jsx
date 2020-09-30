import React from 'react';
import styles from '../css/styles.css';

const AddToBag = ({limit, quantity, changeHandler, buttonHandler}) => {
  const customerLimit = limit;
  return (
    <div className={styles.bag}>

      {quantity > 1 && (
        <button
          type="button"
          className={`${styles.bagAdjust} ${styles.minus}`}
          onClick={() => { buttonHandler('-'); }}
        >
          -
        </button>
      )}
      {quantity <= 1 && (
        <button
          type="button"
          disabled="disabled"
          className={`${styles.bagAdjust} ${styles.minus} ${styles.disabled}`}
        >
          -
        </button>
      )}

      <input
        type="text"
        value={quantity}
        className={styles.bagInput}
        onChange={(e) => { changeHandler(e.target.value); }}
      />

      {quantity < limit && (
        <button
          type="button"
          className={`${styles.bagAdjust} ${styles.plus}`}
          onClick={() => { buttonHandler('+'); }}
        >
          +
        </button>
      )}
      {quantity >= limit && (
        <button
          type="button"
          disabled="disabled"
          className={`${styles.bagAdjust} ${styles.plus} ${styles.disabled}`}
        >
          -
        </button>
      )}

      <div className={styles.customerLimit}>
        {`Limit ${customerLimit}`}
        <div className={styles.info}>i</div>
      </div>
      <button type="submit" className={styles.addToBag}>Add to Bag</button>
    </div>
  );
};

export default AddToBag;
