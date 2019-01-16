import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router';
import App from '../containers/App';
import Search from '../components/Search';
import NoRepos from '../components/NoRepos';
import LoadMore from '../components/LoadMore';
import RepoList from '../components/RepoList';
import Spinner from '../components/Spinner';

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <React.Fragment>
          <Route exact path="/" component={App} />
        </React.Fragment>
      </MemoryRouter>
    );
  });

  it('renders without crashing', () => {
    expect(wrapper.find(App)).toHaveLength(1);
  });

  it('renders Search component', () => {
    expect(wrapper.find(Search)).toHaveLength(1);
  });

  it('renders NoRepos component', () => {
    wrapper.find(App).setState({ userName: 'testUser' });

    expect(wrapper.find(NoRepos)).toHaveLength(1);
  });

  it('renders RepoList component', () => {
    wrapper.find(App).setState({
      userName: 'testUser',
      repos: [
        {
          id: Math.random(),
          repoName: 'repo1',
          fullName: 'testUser/repo1',
          onLoadMoreContributors: () => {},
          loadingContributorsOf: ''
        }
      ]
    });

    expect(wrapper.find(RepoList)).toHaveLength(1);
  });

  it('renders LoadMore button', () => {
    wrapper.find(App).setState({
      userName: 'testUser',
      repos: Array.from({ length: 30 }).map(_ => ({
        id: Math.random(),
        repoName: '',
        fullName: ''
      }))
    });

    expect(wrapper.find(LoadMore)).toHaveLength(1);
  });

  it('renders Spinner component when loading', () => {
    wrapper.find(App).setState({ loading: true });

    expect(wrapper.find(Spinner)).toHaveLength(1);

    wrapper.find(App).setState({ loading: false });

    expect(wrapper.find(Spinner)).toHaveLength(0);
  });
});
