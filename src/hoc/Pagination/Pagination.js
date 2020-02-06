import React from 'react';

import classes from './Pagination.module.scss';

function Pagination (props) {

  const numBtns = () => {
    const btns = [];
    if (props.maxIndex < 10) {
      for (let i = 0; i < props.maxIndex; i++) {
        btns.push(<button
          key={'button' + i}
          onClick={() => props.click(i)}
          className={i === props.currIndex ? classes.active : null} >{i + 1}</button>)
      }
    }
    else {
      let first = 0;
      if (props.currIndex < 4) first = 0
      else if (props.currIndex > props.maxIndex - 5) first = props.maxIndex - 9;
      else first = props.currIndex - 4;

      for(let i = first; i < first + 10; i++){
        btns.push(<button
          key={'button' + i}
          onClick={() => props.click(i)}
          className={i === props.currIndex ? classes.active : null} >{i + 1}</button>)
        }
    }
    return btns;
  }
  console.log({props})

  return (
    <div className={classes.Pagination}>
      <button onClick={() => props.click(0)} disabled={props.currIndex < 1}>First</button>
      <button onClick={() => props.click(props.currIndex - 1)} disabled={props.currIndex < 1}>Prev</button>
      { numBtns() }
      <button onClick={() => props.click(props.currIndex + 1)} disabled={props.currIndex >= props.maxIndex}>Next</button>
      <button onClick={() => props.click(props.maxIndex)} disabled={props.currIndex >= props.maxIndex}>Last</button>
    </div>
  )
};

export default Pagination;
