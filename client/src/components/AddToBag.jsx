import React from 'react';
import styles from '../css/styles.css';

const AddToBag = ({
  limit, quantity, changeHandler, buttonHandler, handleTooltips, limitTooltip
}) => {
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
        <button type="button" className={styles.info} onClick={() => { handleTooltips('limit'); }}>i</button>
        {limitTooltip === true && (
          <div>
            <button type="button" className={styles.tooltip} onClick={() => { handleTooltips('limit'); }} />
            <div className={styles.limitTooltipContainer}>
              <div className={styles.limitTooltipHeader}>Limit</div>
              <div className={styles.limitTooltipText}>
                We restrict the limit a household can buy in order to be fair to all of our fans. If you’ve already reached that limit through previous orders your order may be cancelled.
              </div>
            </div>
          </div>
        )}
      </div>
      <button type="submit" className={styles.addToBag}>Add to Bag</button>
    </div>
  );
};

export default AddToBag;
