// This comp is the parent of BookSearchForm, it passes an onSubmit cb down into this child comp with the relevant AC

import React from 'react';

// Enable connection to the Redux store, used in this comp to connect the createStream action creator (AC) to Redux
import { connect } from 'react-redux';

// The AC used in this comp
import { searchGoogleBooks } from '../../actions';

// The Redux form comp
import BookSearchForm from './BookSearchForm';

const BookSearch = props => {
   const onSubmit = formValues => {
      props.searchGoogleBooks(formValues);
   };

   return (
      <div>
         <h3>Search Google Books</h3>
         <BookSearchForm onSubmit={onSubmit} />
      </div>
   );
};

const mapStateToProps = state => {
   return { bookSearchResults: Object.values(state.bookSearchResults) };
};

// Wrap the StreamCreate comp with the connect function to connect to Redux,
//.. Note: The 1st arg needs to be provided and in this case, as we don't
//.. pass any properties back into this comp, it's null
export default connect(mapStateToProps, { searchGoogleBooks })(BookSearch);
