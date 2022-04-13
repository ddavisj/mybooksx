// This comp checks window width, adds a class to the 2nd highest level div
//.. depending on mobile or widescreen (the comp wraps all others - see App.js)

import React, { useEffect, useState } from 'react';

const Device = props => {
   const [windowWidth, setWindowWidth] = useState(
      document.documentElement.clientWidth
   );
   useEffect(() => {
      window.addEventListener('resize', () => {
         setWindowWidth(document.documentElement.clientWidth);
      });
   }, []);

   return (
      <div
         className={`${props.className} ${
            windowWidth > 700 ? 'wide' : 'mobile'
         }`}
      >
         {props.children}
      </div>
   );
};

export default Device;
