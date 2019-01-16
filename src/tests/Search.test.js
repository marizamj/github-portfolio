import React from 'react';
import { shallow } from 'enzyme';
import Search from '../components/Search';

describe('<Search />', () => {
  it('renders without crashing', () => {
    shallow(<Search onSubmit={() => {}} />);
  });

  it('renders Error', () => {
    const wrapper = shallow(
      <Search onSubmit={() => {}} error={new Error('Error')} />
    );

    expect(
      wrapper.contains(<div className="search__err">Error: Error.</div>)
    ).toEqual(true);
  });

  it('simulates submit events', () => {
    const onSubmit = jest.fn();

    const wrapper = shallow(<Search onSubmit={onSubmit} />);

    wrapper.simulate('submit', { preventDefault: () => {} });

    expect(onSubmit.mock.calls.length).toEqual(1);
  });
});
