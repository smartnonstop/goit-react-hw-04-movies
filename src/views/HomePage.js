import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import tmdb from './../services/tmdb-api';
import routes from './../routes';

export default class HomePage extends Component {

  state = {
    movies: []
  };

  componentDidMount() {
    tmdb.getTrending().then(movies => this.setState({movies}));
  }

  render() {
    return (
      <>  
      <h1>Tranding today</h1>
      <ul>
        {this.state.movies.map(movie => 
          <li key={movie.id}>
            <Link to={{
              pathname: `${routes.movies}/${movie.id}`,
              state: { from: this.props.location }
            }}>{movie.name}</Link>
          </li>)}
      </ul>
      </>
      
    );
  }
}