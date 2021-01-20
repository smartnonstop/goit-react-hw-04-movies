import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from './../routes';

export default function Navigation() {
  return (
    <div>
      <NavLink exact className="link" activeClassName="active_link" to={routes.home}>Home</NavLink>&nbsp;
      <NavLink className="link" activeClassName="active_link" to={routes.movies}>Movies</NavLink>
      <hr />
    </div>
  );
}