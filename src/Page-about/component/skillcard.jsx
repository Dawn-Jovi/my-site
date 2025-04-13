import React from 'react';
import ProgressBar from './progressBar';


function skillcard({id, name, num}) {
  return (
      <div className='skill-item'>
          <div className='skill-item-name' id={id}>
              {name}
              <span
                  className='skill-item-num'
                  style={{ float: 'right' }}>
                  {num}
              </span>
              <ProgressBar percentage={num}/>
          </div>  
      </div>
  );
}

export default skillcard;