import _ from 'lodash';

import { SEARCH_BOOKS } from '../actions/types';

const bookSearchReducer = (state = {}, action) => {
   switch (action.type) {
      case SEARCH_BOOKS:
         return { ...state, ...action.payload };
      default:
         return state;
   }
};

export default bookSearchReducer;
