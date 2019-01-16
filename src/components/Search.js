import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Search.css';

class Search extends Component {
  state = { value: '' };

  handleChange = e => this.setState({ value: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
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
          <div className="search__err">Error: {error.message}.</div>
        ) : null}
      </form>
    );
  }
}

Search.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired
  })
};

export default Search;
