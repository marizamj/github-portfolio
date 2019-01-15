import React from 'react';
import { shallow } from 'enzyme';
import ReposList from '../components/ReposList';

it('renders without crashing', () => {
  shallow(<ReposList repos={[]} />);
});
