import React from 'react';

import classes from './Pagination.module.scss';

function Pagination (props) {

  const numBtns = (num) => {
    const btns = [];
    for(let i = 0; i <= num; i++){
      btns.push(<button
        key={'button' + i}
        onClick={() => props.click(i)}
        className={i === props.currIndex ? classes.active : null} >{i + 1}</button>)
    }
    return btns;
  }

  return (
    <div className={classes.Pagination}>
      <button onClick={() => props.click(0)} disabled={props.currIndex < 1}>First</button>
      <button onClick={() => props.click(props.currIndex - 1)} disabled={props.currIndex < 1}>Previous</button>
      { numBtns(props.maxIndex) }
      <button onClick={() => props.click(props.currIndex + 1)} disabled={props.currIndex >= props.maxIndex}>Next</button>
      <button onClick={() => props.click(props.maxIndex)} disabled={props.currIndex >= props.maxIndex}>Last</button>
    </div>
  )
};

export default Pagination;
