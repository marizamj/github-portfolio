import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Repo.css';

import Spinner from './Spinner';

const Contributor = ({ userName, contributions }) => (
  <li className="repo__contributor">{`${userName} (${contributions} contributions)`}</li>
);

class Repo extends Component {
  getContributors = () => {
    const {
      repo,
      repoContributors,
      onLoadMoreContributors,
      loadingContributorsOf
    } = this.props;

    const list = repoContributors.map(
      ({ userName, repoName, contributions }) => (
        <Contributor
          key={`${repoName}/${userName}`}
          userName={userName}
          contributions={contributions}
        />
      )
    );

    return list.length > 0 && list.length % 30 === 0
      ? [
          ...list,
          loadingContributorsOf !== repo.repoName ? (
            <li
              key={`${repo.repoName}/load-more`}
              className="repo__load-more"
              onClick={() => onLoadMoreContributors(repo, list.length / 30 + 1)}
            >
              ... load more
            </li>
          ) : (
            <Spinner key={`${repo.repoName}/spinner`} />
          )
        ]
      : list;
  };

  render() {
    const { repoContributors } = this.props;
    const { userName, repoName } = this.props.repo;

    return (
      <div className="repo">
        {`${userName}/${repoName} contributors:`}
        <ul>{repoContributors ? this.getContributors() : <Spinner />}</ul>
      </div>
    );
  }
}

Repo.propTypes = {
  repo: PropTypes.object.isRequired,
  repoContributors: PropTypes.array,
  onLoadMoreContributors: PropTypes.func.isRequired,
  loadingContributorsOf: PropTypes.string.isRequired
};

Contributor.propTypes = {
  userName: PropTypes.string.isRequired,
  contributions: PropTypes.number.isRequired
};

export default Repo;
