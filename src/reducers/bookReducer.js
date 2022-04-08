// Store all streams within the Redux store as values with an object (rather than array).
//.. The obj type was chosen to simplify access to streams via accessor notation eg. stream[2]

// Lodash omit enables outright deletion of an obj property, is cleaner than replacing with an empty/null value
import _ from 'lodash';

import {
   FETCH_BOOKS,
   FETCH_BOOK,
   CREATE_BOOK,
   EDIT_BOOK,
   DELETE_BOOK,
} from '../actions/types';

const bookReducer = (state = {}, action) => {
   switch (action.type) {
      case FETCH_BOOKS:
         return { ...state, ..._.mapKeys(action.payload, 'id') };
      case FETCH_BOOK:
         return { ...state, [action.payload.id]: action.payload };
      case CREATE_BOOK:
         return { ...state, [action.payload.id]: action.payload };
      case EDIT_BOOK:
         return { ...state, [action.payload.id]: action.payload };
      case DELETE_BOOK:
         return _.omit(state, action.payload);
      default:
         return state;
   }
};

export default bookReducer;
