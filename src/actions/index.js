// This file contains all action creators (ACs) used within the app

// APIs: Axios clients that simplify request creation via Axios.create
import myBooks from '../apis/myBooks';
import googleBooks from '../apis/googleBooks';

// History enables programmatic navigation directly within action creators
import history from '../history';

// Action types, ie. strings, are imported as variables to improve error reporting
import {
   SIGN_IN,
   SIGN_OUT,
   SEARCH_BOOKS,
   CREATE_BOOK,
   FETCH_BOOKS,
   FETCH_BOOK,
   EDIT_BOOK,
   DELETE_BOOK,
} from './types';

// This AC uses our Axios client/googleBooks API to search for books matching the search term
export const searchGoogleBooks = formValues => async dispatch => {
   const response = await googleBooks.get('/', {
      params: { q: formValues },
   });

   dispatch({ type: SEARCH_BOOKS, payload: response.data.items });
   history.push('/search-results');
};

export const createBook = bookData => async (dispatch, getState) => {
   const { userId } = getState().auth;
   const response = await myBooks.post('/books', {
      ...bookData,
      userId,
   });

   dispatch({ type: CREATE_BOOK, payload: response.data });
   history.push('/');
};

//// The following ACs enable CRUD operations via the API (and Axios stream client)

// Fetch all records from the API and load into the store
export const loadBooks = () => async dispatch => {
   const response = await myBooks.get('/books');
   if (response.data) {
      console.log('Nuthin');
   }

   dispatch({ type: FETCH_BOOKS, payload: response.data });
};
export const fetchBooks = () => async dispatch => {
   const response = await myBooks.get('/books');
   // console.log(response);

   dispatch({ type: FETCH_BOOKS, payload: response.data });
};

// Fetch a specific record and load into the store
export const fetchBook = id => async dispatch => {
   const response = await myBooks.get(`/books/${id}`);

   dispatch({ type: FETCH_BOOK, payload: response.data });
};

// Update a specific record with values from a form, load into Redux, then redirect home
export const editBook = (id, formValues) => async dispatch => {
   const response = await myBooks.patch(`/books/${id}`, formValues);

   dispatch({ type: EDIT_BOOK, payload: response.data });
   history.push('/');
};

// Delete a specific record, update Redux, then redirect home
export const deleteBook = id => async dispatch => {
   await myBooks.delete(`/books/${id}`);

   dispatch({ type: DELETE_BOOK, payload: id });
   history.push('/');
};

// Google Authentication ACs - allows the GoogleAuth comp to provide sign-in status to various comps

export const signIn = userId => {
   return { type: SIGN_IN, payload: userId };
};

export const signOut = () => {
   return { type: SIGN_OUT };
};

// Device check ACs

// export const isMobile = isMobile => {
//    return { type: 'MOB_DEVICE' };
// };

export const mobDevice = () => {
   console.log('Mobile check!');
   return { type: 'MOB_DEVICE' };
};

export const wideDevice = () => {
   console.log('Widescreen check!');
   return { type: 'WIDE_DEVICE' };
};
