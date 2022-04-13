// Show a spinner while loading - default text is Loading

import React from 'react';

const Spinner = props => {
   return (
      <div className="ui active dimmer">
         <div className="ui big text loader">{props.message}</div>
      </div>
   );
};

// Default props in case none are provided
// .. ComponentName.defaultprops = {}

Spinner.defaultProps = {
   message: 'Loading...',
};

export default Spinner;
