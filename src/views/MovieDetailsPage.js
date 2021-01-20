import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import tmdb from './../services/tmdb-api';
import style from './styles/MovieDetailsPage.module.css';
import routes from './../routes';
import Cast from './../components/Cast';
import Reviews from './../components/Reviews';

export default class MoviesPage extends Component {

  state = {
    movie: null
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;
    this.fetchMovieDetails(movieId);
  }

  fetchMovieDetails = (movieId) => {
    tmdb.searchSingleMovie(movieId)
    .then(movie => this.setState({ movie }));
  }

  goBack = () => {  
    
    if(this.props.location.state && this.props.location.state.from) {
      const { from } = this.props.location.state;
      this.props.history.push({
        pathname: from.pathname,
        search: from.search
      });
    } else {
      this.props.history.push({ pathname: '/' });
    }
    
  }

  render() {
    const { movie } = this.state;
    return (
      <>  
      {movie && 
        <>
        <button className={style.back_btn} onClick={this.goBack}>Go back</button>
        <div className={style.movie}>
          <img className={style.movie_poster} src={movie.poster} alt={movie.name} />
          <div className={style.movie_detail}>
            <h1 className={style.movie_name}>{movie.name} ({movie.year})</h1>
            <p>User score: {movie.percent}%</p>
            <h2 className={style.movie_heading}>Overview</h2>
            <p className={style.movie_text}>{movie.overview}</p>
            <h2 className={style.movie_heading}>Genres</h2>
            <p className={style.movie_text}>{movie.genres.join(", ")}</p>
          </div>
        </div>

        <div>
          <p>Additional information</p>
          <ul>
            <li><Link to={this.props.match.url+routes.cast}>Cast</Link></li>
            <li><Link to={this.props.match.url+routes.reviews}>Reviews</Link></li>
          </ul>
        </div>

        <Route path={this.props.match.path+routes.cast} component={Cast} />
        <Route path={this.props.match.path+routes.reviews} component={Reviews} />
        </>
      }
      </>
      
    );
  }
}