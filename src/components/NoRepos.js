import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';

function NoRepos({ userName }) {
  return (
    <div className="no-repos">
      User<strong> {userName} </strong>
      doesn’t have any public repositories yet.
    </div>
  );
}

NoRepos.propTypes = {
  userName: PropTypes.string.isRequired
};

export default NoRepos;
