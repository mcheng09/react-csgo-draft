import React from 'react';

import classes from './SearchBar.module.scss'

function SearchBar(props) {
  return (
    <div className={classes.SearchBar}>
      <input
        type='text'
        placeholder='Search'
        onChange={props.searchTerm} />
    </div>
  )
}

export default SearchBar;
