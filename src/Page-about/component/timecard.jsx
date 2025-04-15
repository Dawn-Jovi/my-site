import React from 'react';
import './timecard.css'

function timecard({id, title, num, text}) {
  return (
    <div className='timecard-start' key={id}>
        <h3 className='timecard-tite'>{title}</h3>
        <p className='timecard-count'>{num}</p>
        <small className='timecard-subutitle'>{text}</small>
    </div>
  );
}

export default timecard;