import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Repo from './Repo';

class RepoList extends Component {
  render() {
    const {
      repos,
      contributors,
      onLoadMoreContributors,
      loadingContributorsOf
    } = this.props;

    return (
      <div>
        {repos.map(repo => (
          <Repo
            key={repo.id}
            repo={repo}
            repoContributors={contributors[repo.repoName]}
            onLoadMoreContributors={onLoadMoreContributors}
            loadingContributorsOf={loadingContributorsOf}
          />
        ))}
      </div>
    );
  }
}

RepoList.propTypes = {
  repos: PropTypes.array.isRequired,
  contributors: PropTypes.object.isRequired,
  onLoadMoreContributors: PropTypes.func.isRequired,
  loadingContributorsOf: PropTypes.string.isRequired
};

export default RepoList;
