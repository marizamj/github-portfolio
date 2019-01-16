import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Repo.css';
import { MAX_ITEMS } from '../config';

import Spinner from './Spinner';

const Contributor = ({ userName, contributions, noContributors }) =>
  noContributors ? (
    <li className="repo__no-contributors">No contributors</li>
  ) : (
    <li className="repo__contributor">{`${userName} (${contributions} contribution${
      contributions > 1 ? 's' : ''
    })`}</li>
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
      ({ userName, repoName, contributions, noContributors }) => (
        <Contributor
          key={`${repoName}/${userName}`}
          userName={userName}
          contributions={contributions}
          noContributors={noContributors}
        />
      )
    );

    return list.length > 0 && list.length % MAX_ITEMS === 0
      ? [
          ...list,
          loadingContributorsOf !== repo.repoName ? (
            <li
              key={`${repo.repoName}/load-more`}
              className="repo__load-more"
              onClick={() =>
                onLoadMoreContributors(repo, list.length / MAX_ITEMS + 1)
              }
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
    const { fullName } = this.props.repo;

    return (
      <div className="repo">
        {`${fullName} contributors:`}
        <ul>{repoContributors ? this.getContributors() : <Spinner />}</ul>
      </div>
    );
  }
}

Repo.propTypes = {
  repo: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    repoName: PropTypes.string.isRequired
  }).isRequired,
  repoContributors: PropTypes.array,
  onLoadMoreContributors: PropTypes.func.isRequired,
  loadingContributorsOf: PropTypes.string.isRequired
};

Contributor.propTypes = {
  userName: PropTypes.string,
  contributions: PropTypes.number,
  noContributors: PropTypes.bool
};

export default Repo;
