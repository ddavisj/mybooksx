import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
// import { mobDevice, wideDevice } from '../actions';

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

// const mapStateToProps = state => {
//    //    console.log(state);
//    return {
//       isMobile: state.isMobile,
//    };
// };

// export default connect(mapStateToProps, { mobDevice, wideDevice })(Device);
export default Device;
