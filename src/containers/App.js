import React, { Component } from 'react';
import '../styles/App.css';
import { fetchRepos, fetchContributorsForAll, fetchContributors } from '../lib';

import ReposList from '../components/ReposList';
import Search from '../components/Search';

class App extends Component {
  state = {
    userName: '',
    repos: [],
    contributors: {},
    page: 1,
    error: null,
    loading: false,
    loadingContributorsOf: ''
  };

  componentDidMount() {
    this.handleUser(this.props.location.pathname.slice(1));
  }

  componentDidUpdate() {
    const userInUrl = this.props.location.pathname.slice(1);

    if (userInUrl !== this.state.userName) {
      this.handleUser(userInUrl);
    }
  }

  handleSubmit = userName => {
    this.props.history.push(userName);
    this.handleUser(userName);
  };

  handleUser = (userName, page = 1) => {
    this.setState({ userName, repos: [], page });
    this.handleRetrieve(userName, page);
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
      .catch(error => {
        console.error(error);
        this.setState({ error, loading: false });
      });
  };

  handleLoadMoreRepos = () => {
    const { userName, page } = this.state;
    this.handleRetrieve(userName, page + 1);
  };

  onLoadMoreContributors = (repo, page) => {
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

    return (
      <div className="app">
        <header className="app__header">
          <h1>GitHub Portfolio</h1>
        </header>
        <Search error={error} handleSubmit={this.handleSubmit} />
        {userName && !error ? (
          <ReposList
            repos={repos}
            contributors={contributors}
            loading={loading}
            userName={userName}
            onLoadMoreRepos={this.handleLoadMoreRepos}
            onLoadMoreContributors={this.onLoadMoreContributors}
            loadingContributorsOf={loadingContributorsOf}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
