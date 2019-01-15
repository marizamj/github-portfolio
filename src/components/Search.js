import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Search.css';

class Search extends Component {
  state = { value: '' };

  handleChange = e => this.setState({ value: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    const { error } = this.props;

    return (
      <form className="search" onSubmit={this.handleSubmit}>
        <label className="search__label">Username</label>

        <input
          className="search__input"
          type="text"
          value={value}
          onChange={this.handleChange}
        />

        <input className="search__submit" type="submit" value="Retrieve" />

        {error ? (
          <div className="search__err">
            Something went wrong. Please, try again.
          </div>
        ) : null}
      </form>
    );
  }
}

Search.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};

export default Search;
