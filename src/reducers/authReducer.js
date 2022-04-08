// This reducer stores authentication status, enabling comps to determine if user is signed in

import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
   isSignedIn: null,
   userId: null,
};

// I named this func authReducer - he didn't but I got a linter warning..
//.. "Assign arrow function to a variable before exporting as module"
//.. and then exported the named func
//.. His original code:
// export default (state = INITIAL_STATE, action) => {
//     switch (action.type) {
//        case 'SIGN_IN':

const authReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case SIGN_IN:
         return { ...state, isSignedIn: true, userId: action.payload };
      case SIGN_OUT:
         return { ...state, isSignedIn: false, userId: null };
      default:
         return state;
   }
};

export default authReducer;
