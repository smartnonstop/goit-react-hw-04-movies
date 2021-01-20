import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import tmdb from './../services/tmdb-api';
import qs from 'query-string';

export default class MoviesPage extends Component {

  state = {
    movies: []
  };

  componentDidMount() {
    const search = qs.parse(this.props.location.search);
    if(search.query !== undefined) {
      this.fetchMovies(search.query);
    }
    
  }

  componentDidUpdate(prevProps, prevState) {
    const prevParams = qs.parse(prevProps.location.search);
    const nextParams = qs.parse(this.props.location.search);

    if(prevParams.query !== nextParams.query) {
      this.fetchMovies(nextParams.query);
    }
  }


  formHandle = (query) => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `query=${query}`
    });
  }

  fetchMovies = (query) => {
    if(query === '') return;
    tmdb.searchMovie(query)
    .then(movies => this.setState({ movies }))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <>  
      <h1>Movies page</h1>
      <SearchForm onSubmit={this.formHandle} />
      <ul>
        {this.state.movies.map(movie => 
          <li key={movie.id}>
            <Link to={{
              pathname: `${this.props.match.url}/${movie.id}`,
              state: { from: this.props.location }
            }}>{movie.name}</Link>
          </li>)}
      </ul>
      </>
      
    );
  }
}