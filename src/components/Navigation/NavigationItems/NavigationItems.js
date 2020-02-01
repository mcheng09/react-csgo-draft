import React from 'react';
import { Link } from 'react-router-dom';

import classes from './NavigationItems.module.scss';

function NavigationItems () {
  return (
    <div className={classes.NavigationItems}>
      <Link to='/'>Home</Link>
      <Link to='/players'>Players</Link>
      <Link to='/contact'>Contact Us</Link>
    </div>
  )
}

export default NavigationItems;
