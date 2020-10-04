import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/styles.css';

const AddToBag = ({
  limit, quantity, changeHandler, buttonHandler, handleTooltips, limitTooltip, closestTooltip,
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
            <button type="button" className={styles.limitTooltip} aria-label="button" onClick={() => { handleTooltips('limit'); }} />
            <div className={styles.limitTooltipContainer}>
              <div className={styles.limitTooltipHeader}>Limit</div>
              <div className={styles.limitTooltipText}>
                We restrict the limit a household can buy in order to be fair to all of our fans. If
                you’ve already reached that limit through previous orders your order may be
                cancelled.
              </div>
            </div>
          </div>
        )}
        {closestTooltip === true && (
          <div>
            <button type="button" className={styles.closestTooltip} aria-label="button" onClick={() => { handleTooltips('closest'); }} />
            <div className={styles.closestTooltipContainer}>
              <div className={styles.closestTooltipHeader}>Please Note:</div>
              <div className={styles.closestTooltipText}>
                The green check mark indicates that this item is currently available in this
                location. Items sell at varying rates and this is not a guarantee that the item
                will remain in stock for an extended period of time.  If you want to ensure
                availability, visit the store soon or call ahead and speak with a Brick
                Specialist.
              </div>
            </div>
          </div>
        )}
      </div>
      <button type="submit" className={styles.addToBag}>Add to Bag</button>
    </div>
  );
};

AddToBag.propTypes = {
  quantity: PropTypes.number.isRequired,
  changeHandler: PropTypes.func.isRequired,
  buttonHandler: PropTypes.func.isRequired,
  handleTooltips: PropTypes.func.isRequired,
  limit: PropTypes.number,
  limitTooltip: PropTypes.bool,
  closestTooltip: PropTypes.bool,
};

AddToBag.defaultProps = {
  limit: PropTypes.number,
  limitTooltip: PropTypes.bool,
  closestTooltip: PropTypes.bool,
};

export default AddToBag;
