// Exports all reducers (make avail in the Redux store)

// Here we have a reducer for books to be stored in our DB via our API, as well as a reducer to
//.. enable us to work with results obtained via Google Books searches

import { combineReducers } from 'redux';

import authReducer from './authReducer';
import bookReducer from './bookReducer';
import bookSearchReducer from './bookSearchReducer';

export default combineReducers({
   auth: authReducer,
   books: bookReducer,
   bookSearchResults: bookSearchReducer,
});
