import React from 'react';
import { shallow } from 'enzyme';
import Repo from '../components/Repo';

it('renders without crashing', () => {
  shallow(<Repo />);
});
