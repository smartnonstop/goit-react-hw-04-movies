import React, { Component } from 'react';
import tmdb from './../services/tmdb-api';
import style from './styles/Cast.module.css';

export default class Cast extends Component {

  state = {
    cast: []
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;
    tmdb.searchMovieCast(movieId).then(cast => this.setState({ cast }))
  }

  render() {

    const { cast } = this.state;
    return (
      <>
        <hr />
        <ul>
          {cast.map(item => <li className={style.list_item} key={item.id}>
            <img className={style.cast_img} src={item.photo} alt={item.name} />
            <p className={style.cast_text}>{item.name}</p>
            <p className={style.cast_text}>Character: {item.character}</p>
          </li>)}
        </ul>
      </>
    );
  }
}