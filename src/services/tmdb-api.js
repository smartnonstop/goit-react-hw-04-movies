
const baseUrl = 'https://api.themoviedb.org/3/';
const API_KEY = '1feaead57f5da8ef9a8a2cac1d1bfc73';
const image_src = 'https://image.tmdb.org/t/p/w500/';

// https://api.themoviedb.org/3/movie/76341?api_key=<<api_key>>
//https://image.tmdb.org/t/p/w500/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg

const getTrending = () => {
  return fetch(`${baseUrl}trending/all/day?api_key=${API_KEY}`)
  .then(res => res.json())
  .then(entries => entries.results.filter(movie => movie.original_title!==undefined)
                                  .map(movie => ({id: movie.id, name: movie.original_title})));
} 

const searchMovie = (query) => {
  return fetch(`${baseUrl}search/movie?api_key=${API_KEY}&query=${query}`)
  .then(res => res.json())
  .then(entries => entries.results.filter(movie => movie.original_title!==undefined)
                                  .map(movie => ({id: movie.id, name: movie.original_title})));
}

const searchSingleMovie = (movieId) => {
  return fetch(`${baseUrl}movie/${movieId}?api_key=${API_KEY}`)
  .then(res => res.json())
  .then(data => ({
    id: data.id,
    name: data.original_title,
    year: data.release_date.substring(0, 4),
    percent: data.vote_average*10,
    overview: data.overview,
    genres: data.genres.map(genre => genre.name),
    poster: image_src+data.poster_path
  }));
}

const searchMovieCast = (movieId) => {
  return fetch(`${baseUrl}movie/${movieId}/credits?api_key=${API_KEY}`)
  .then(res => res.json())
  .then(data => {
    return data.cast.map(item => ({
      id: item.cast_id,
      name: item.name,
      character: item.character,
      photo: image_src+item.profile_path
    }));
  });
}

const searchMovieReviews = (movieId) => {
  return fetch(`${baseUrl}movie/${movieId}/reviews?api_key=${API_KEY}`)
  .then(res => res.json())
  .then(data => {
    return data.results.map(item => ({
      id: item.id,
      author: item.author,
      content: item.content
    }));
  });
}



const obj = {
  getTrending,
  searchMovie,
  searchSingleMovie,
  searchMovieCast,
  searchMovieReviews
}

export default obj;