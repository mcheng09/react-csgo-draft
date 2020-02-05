import React from 'react';

function Pagination (props) {
  return (
    <div>
      <button onClick={() => props.click(0)} disabled={props.currIndex < 1}>First</button>
      <button onClick={() => props.click(props.currIndex - 1)} disabled={props.currIndex < 1}>Previous</button>
      <button onClick={() => props.click(props.currIndex + 1)} disabled={props.currIndex >= props.maxIndex}>Next</button>
      <button onClick={() => props.click(props.maxIndex)} disabled={props.currIndex >= props.maxIndex}>Last</button>
    </div>
  )
};

export default Pagination;
