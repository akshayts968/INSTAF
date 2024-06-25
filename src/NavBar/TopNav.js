import './TopNav.css';
import React from 'react';
function TopNav() {
  const [image,setImage]=React.useState(0);
  
  return (
    <div className="TopNav">
      <img className='topleftimg'  src='https://thumbs.dreamstime.com/b/print-204012277.jpg'/>
      <div className='topRight'>
         <div className='search-bar'>
           {!image && <img className='searchf' src='https://static.vecteezy.com/system/resources/thumbnails/014/441/308/small_2x/magnifying-glass-icon-3d-design-for-application-and-website-presentation-png.png'/>}
           <input type='text' placeholder='Search' className='Search' onClick={()=>{setImage(1); console.log("hai")}} onBlur={()=>setImage(0)}
           />
           {image && <img className='searchs' src='https://static.vecteezy.com/system/resources/thumbnails/014/441/308/small_2x/magnifying-glass-icon-3d-design-for-application-and-website-presentation-png.png'/>}
         </div>
         <div className='heart'>
            <img src='https://www.svgrepo.com/show/532473/heart.svg'></img>
         </div>
         {image&&<div className='search-res'>
            <div className='search-recent'>Recent</div>
         </div>}
      </div>
    </div>
  );
}

export default TopNav;
