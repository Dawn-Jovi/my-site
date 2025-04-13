import React from 'react';
import './timecard.css'

function timecard({title, num, text}) {
  return (
    <div className='start'>
        <h3 className='start-item-tite'>{title}</h3>
        <p className='start-item-count'>{num}</p>
        <small className='start-item-subutitle'>{text}</small>
    </div>
  );
}

export default timecard;