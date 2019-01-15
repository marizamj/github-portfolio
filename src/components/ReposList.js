import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/ReposList.css';

import Repo from './Repo';
import Spinner from './Spinner';

const NoRepos = ({ userName }) => (
  <div className="repos__msg">{`${userName} doesn’t have any public repositories yet.`}</div>
);

class ReposList extends Component {
  render() {
    const {
      repos,
      userName,
      contributors,
      onLoadMoreRepos,
      onLoadMoreContributors,
      loading,
      loadingContributorsOf
    } = this.props;

    return (
      <div className="repos">
        {repos.length === 0 && !loading ? (
          <NoRepos userName={userName} />
        ) : (
          repos.map(repo => (
            <Repo
              key={repo.id}
              repo={repo}
              repoContributors={contributors[repo.repoName]}
              onLoadMoreContributors={onLoadMoreContributors}
              loadingContributorsOf={loadingContributorsOf}
            />
          ))
        )}

        {repos.length % 30 === 0 && repos.length > 0 && !loading ? (
          <input
            type="button"
            className="repos__btn"
            onClick={onLoadMoreRepos}
            value="Load more"
          />
        ) : null}

        {loading && <Spinner className="repos__spinner" />}
      </div>
    );
  }
}

ReposList.propTypes = {
  repos: PropTypes.array.isRequired,
  contributors: PropTypes.object.isRequired,
  onLoadMoreRepos: PropTypes.func.isRequired,
  onLoadMoreContributors: PropTypes.func.isRequired,
  loadingContributorsOf: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired
};

export default ReposList;
