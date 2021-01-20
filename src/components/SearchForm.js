import React, { Component } from 'react';

export default class SearchForm extends Component {

  state = {
    query: ''
  };

  inputChange = (e) => {
    this.setState({ query: e.target.value})
  }

  formSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  }

  render() {

    const { query } = this.state;

    return (
      <form onSubmit={this.formSubmit}>
        <input type="text" value={query} onChange={this.inputChange} />
        <button type="submit">Search</button>
      </form>
    );
  }
}