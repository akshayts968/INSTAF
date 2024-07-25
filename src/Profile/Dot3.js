import React from 'react';
import './Dot3.css';
import { useState } from 'react';
import { faL } from '@fortawesome/free-solid-svg-icons';
function Item({ text, color }) {
  return (
    <div className='dotItem' style={{ color }}>
      {text}
    </div>
  );
}

function Dot3({toggle}) {
  const items = [
    'Report',
    'Unfollow',
    'Add to favorites',
    'Go to post',
    'Share to..',
    'Copy link',
    'Embed',
    'About this account',
    'Cancel'
  ];

  return (
    <div className='Dot' onClick={toggle}>
    <div className="Dot3">
      <div className="Dot3Main">
        {items.map((item, index) => (
          <Item 
            key={index} 
            text={item} 
            color={index < 2 ? 'rgb(237, 73, 86)' : 'white'} 
          />
        ))}
      </div>
    </div> </div>
  );
}

export default Dot3;
