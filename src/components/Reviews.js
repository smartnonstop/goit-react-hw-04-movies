import React, { Component } from 'react';
import tmdb from './../services/tmdb-api';

export default class Reviews extends Component {

  state = {
    reviews: []
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;
    tmdb.searchMovieReviews(movieId).then(reviews => this.setState({ reviews }));
  }

  render() {

    const { reviews } = this.state;
    return (
      <>
        <hr />
        <ul>
          {reviews.map(item => <li key={item.id}>
            <p>Author: {item.author}</p>
            <p>{item.content}</p>
          </li>)}
        </ul>
      </>
    );
  }
}