// This modal makes use of React's portal function to attach the modal to the index.html's #modal div
import './Modal.css';
import React from 'react';
import ReactDOM from 'react-dom';

// If we click outside of the modal, run the onDismiss cb, ie. close the modal
// Stop propagation of clicks on the modal up through the DOM
// All relevant properties are passed in as props, ensuring max reusability in this comp
const Modal = props => {
   return ReactDOM.createPortal(
      <div
         onClick={props.onDismiss}
         className="ui dimmer modals visible active"
      >
         <div
            onClick={e => e.stopPropagation()}
            className="ui standard modal visible active"
         >
            <div className="header">{props.title}</div>
            <div className="content">{props.content}</div>
            <div className="actions">{props.actions}</div>
         </div>
      </div>,
      document.querySelector('#modal')
   );
};

export default Modal;
