import React from 'react';
import styles from '../css/styles.css';

const Tag = ({ tag }) => {
  const tags = ['New', 'Exclusives', 'Hard to find'];
  if (tag !== 0) {
    return (
      <div className={styles.tag}>{tags[tag - 1]}</div>
    );
  }
  return (
    <div> </div>
  );
};

export default Tag;
