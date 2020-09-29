import React from 'react';

const Tag = (props) => {
  const tags = ['New', 'Exclusives', 'Hard to find'];
  if (props.tag !== 0) {
    return (
      <div id="tag">{tags[props.tag - 1]}</div>
    );
  }
  return (
    <div>nothing</div>
  );
};

export default Tag;
