import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/styles.css';

const Tag = ({ tag }) => {
  // const tags = ['New', 'Exclusives', 'Hard to find'];
  if (tag !== 0) {
    return (
      <div className={styles.tag}>{tag}</div>
    );
  }
  return (
    <div />
  );
};

Tag.propTypes = {
  tag: PropTypes.number.isRequired,
};

export default Tag;
