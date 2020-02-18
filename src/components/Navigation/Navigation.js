import React from 'react';
import { Link } from 'react-router-dom';

import NavigationItems from './NavigationItems/NavigationItems'
import classes from './Navigation.module.scss'

function Navigation() {
  return (
    <nav className={classes.Navigation}>
      <Link to='/' className={classes.Logo}>CSGO Draft</Link>
      <NavigationItems />
      <Link to='/' className={classes.Logo}>CSGO Draft</Link>
    </nav>
  )
}

export default Navigation;
