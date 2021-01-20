import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './../views/HomePage';
import MoviesPage from './../views/MoviesPage';
import MovieDetailsPage from './../views/MovieDetailsPage';
import routes from './../routes';

export default function App() {

  return (
    <Layout>
        <Switch>
          <Route path={routes.home} exact component={HomePage} />
          <Route path={routes.movies} exact component={MoviesPage} />
          <Route path={`${routes.movies}/:movieId`} component={MovieDetailsPage} />
        </Switch>
    </Layout>
  );
}