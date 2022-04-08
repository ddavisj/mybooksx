import './GoogleAuth.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import history from '../history';

// Bc auth is used by various functions in this comp, declare it on the window
//.. It is then defined in .then in useEffect
let auth;

const GoogleAuth = props => {
   useEffect(() => {
      // Load up the auth2 lib (w gapi load method), authenticate our app via our clientId and set G API scopes
      window.gapi.load('client:auth2', () => {
         window.gapi.client
            .init({
               clientId:
                  '209070770196-f1ombe57q6sdvvlhu3blvb3ppuh42m6d.apps.googleusercontent.com',
               scope: 'email',
            })
            // The listen call is a listener for the isSignedIn obj! Lets us add in EH cbs
            // When the gapi client lib is loaded AND the app initialised to access email scope etc.. then..
            .then(() => {
               auth = window.gapi.auth2.getAuthInstance();
               onAuthChange(auth.isSignedIn.get());
               auth.isSignedIn.listen(onAuthChange);
               // Set a listener on the auth.isSignedIn obj.. to listen for changes in this obj's status,
               //.. when the change occurs, run the oAC cb.. and reset state to current logged in status
               //.. when we set state again, this causes a rerender and the logged in button changes
            });
      });
   }, []);

   // A listener is set on the auth.isSignedIn obj above, and this func is run when auth changes
   //.. When auth status changes, pass this status and userId to the signIn AC and update
   //.. the Redux store, else run the signOut AC
   const onAuthChange = isSignedIn => {
      if (isSignedIn) {
         props.signIn(auth.currentUser.get().getId());
      } else {
         props.signOut();
      }
   };

   // When the user clicks to sign in, initiate the Google sign in process
   const onSignInClick = () => {
      auth.signIn();
   };

   // When user signs out, initiate the Google sign out process
   const onSignOutClick = () => {
      auth.signOut();
      history.push('/');
   };

   // Render the button itself, pass in AC and text
   const renderAuthButton = (ac, text, loggedIn) => {
      return (
         <button
            onClick={ac}
            className={`ui google button ${
               loggedIn ? 'logged-in' : 'logged-out'
            }`}
         >
            <i className="google icon" />
            {text}
         </button>
      );
   };

   // Render the sign in with Google Button
   const renderAuthDiv = () => {
      if (props.isSignedIn === null) {
         return renderAuthButton(
            () => {
               console.log('loading');
            },
            '.............',
            true
         );
      } else if (props.isSignedIn) {
         return renderAuthButton(onSignOutClick, 'Logout', true);
      } else {
         return renderAuthButton(onSignInClick, 'Login', false);
      }
   };

   return <div className="margin-auto">{renderAuthDiv()}</div>;
};

const mapStateToProps = state => {
   return {
      isSignedIn: state.auth.isSignedIn,
   };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
