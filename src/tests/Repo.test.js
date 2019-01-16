import React from 'react';
import { shallow } from 'enzyme';
import Repo from '../components/Repo';

describe('<Repo />', () => {
  it('renders without crashing', () => {
    shallow(
      <Repo
        repo={{ fullName: 'testUser/repo1', repoName: 'repo1' }}
        onLoadMoreContributors={() => {}}
        loadingContributorsOf=""
      />
    );
  });

  it('simulates click events', () => {
    const onLoadMoreContributors = jest.fn();

    const wrapper = shallow(
      <Repo
        repo={{ fullName: 'testUser/repo1', repoName: 'repo1' }}
        onLoadMoreContributors={onLoadMoreContributors}
        loadingContributorsOf=""
        repoContributors={Array.from({ length: 30 }).map(_ => ({
          userName: '',
          repoName: '',
          contributions: 0
        }))}
      />
    );

    expect(wrapper.find('.repo__load-more')).toHaveLength(1);

    wrapper.find('.repo__load-more').simulate('click');

    expect(onLoadMoreContributors.mock.calls.length).toEqual(1);
  });
});
