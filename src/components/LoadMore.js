import React from 'react';
import PropTypes from 'prop-types';
import '../styles/LoadMore.css';

function LoadMore({ onClick }) {
  return (
    <input
      type="button"
      className="load-more"
      onClick={onClick}
      value="Load more"
    />
  );
}

LoadMore.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default LoadMore;
