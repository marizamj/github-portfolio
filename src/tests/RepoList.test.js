import React from 'react';
import { shallow } from 'enzyme';
import RepoList from '../components/RepoList';
import Repo from '../components/Repo';

describe('<RepoList />', () => {
  it('renders without crashing', () => {
    shallow(
      <RepoList
        repos={[]}
        contributors={{}}
        onLoadMoreContributors={() => {}}
        loadingContributorsOf=""
      />
    );
  });

  it('renders two <Repo /> components', () => {
    const wrapper = shallow(
      <RepoList
        repos={[
          {
            id: Math.random(),
            repoName: 'repo1',
            fullName: 'testUser/repo1',
            onLoadMoreContributors: () => {},
            loadingContributorsOf: ''
          },
          {
            id: Math.random(),
            repoName: 'repo2',
            fullName: 'testUser/repo2',
            onLoadMoreContributors: () => {},
            loadingContributorsOf: ''
          }
        ]}
        contributors={{}}
        onLoadMoreContributors={() => {}}
        loadingContributorsOf=""
      />
    );

    expect(wrapper.find(Repo)).toHaveLength(2);
  });
});
