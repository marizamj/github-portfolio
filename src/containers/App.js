import React, { Component } from 'react';
import '../styles/App.css';
import { fetchRepos, fetchContributorsForAll, fetchContributors } from '../lib';
import { MAX_ITEMS } from '../config';

import LoadMore from '../components/LoadMore';
import NoRepos from '../components/NoRepos';
import RepoList from '../components/RepoList';
import Search from '../components/Search';
import Spinner from '../components/Spinner';

class App extends Component {
  state = {
    userName: '',
    page: 1,
    repos: [],
    contributors: {},
    error: null,
    loading: false,
    loadingContributorsOf: ''
  };

  componentDidMount() {
    this.handleUser(this.props.match.params.userName);
  }

  componentDidUpdate() {
    const { userName } = this.props.match.params;

    if (userName !== this.state.userName) {
      this.handleUser(userName);
    }
  }

  handleSubmit = userName => {
    this.props.history.push(userName);
    this.handleUser(userName);
  };

  handleUser = userName => {
    this.setState({ userName, repos: [], page: 1 });
    this.handleRetrieve(userName);
  };

  handleRetrieve = (userName, page = 1) => {
    this.setState({ loading: true });

    fetchRepos(userName, page)
      .then(repos => {
        this.setState({
          repos: this.state.repos.concat(repos),
          page,
          error: null,
          loading: false
        });
      })
      .then(() => fetchContributorsForAll(this.state.repos))
      .then(contributors => this.setState({ contributors }))
      .catch(error => this.setState({ error, loading: false }));
  };

  handleLoadMoreRepos = () => {
    const { userName, page } = this.state;
    this.handleRetrieve(userName, page + 1);
  };

  handleLoadMoreContributors = (repo, page) => {
    const { contributors } = this.state;
    const { repoName } = repo;

    this.setState({ loadingContributorsOf: repoName });

    fetchContributors(repo, page)
      .then(newContributors =>
        this.setState({
          contributors: {
            ...contributors,
            [repoName]: contributors[repoName].concat(newContributors)
          },
          loadingContributorsOf: ''
        })
      )
      .catch(console.error);
  };

  render() {
    const {
      repos,
      error,
      loading,
      userName,
      contributors,
      loadingContributorsOf
    } = this.state;

    const shouldLoadMore =
      repos.length % MAX_ITEMS === 0 && repos.length > 0 && !loading;

    return (
      <div className="app">
        <header className="app__header">
          <h1>GitHub Portfolio</h1>
        </header>
        <Search error={error} onSubmit={this.handleSubmit} />
        {userName && !error && (
          <React.Fragment>
            {repos.length === 0 && !loading ? (
              <NoRepos userName={userName} />
            ) : (
              <RepoList
                repos={repos}
                contributors={contributors}
                onLoadMoreContributors={this.handleLoadMoreContributors}
                loadingContributorsOf={loadingContributorsOf}
              />
            )}
            {shouldLoadMore && <LoadMore onClick={this.handleLoadMoreRepos} />}
          </React.Fragment>
        )}
        {loading && <Spinner className="app__spinner" />}
      </div>
    );
  }
}

export default App;
