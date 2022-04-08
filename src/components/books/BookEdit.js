// We use a lodash function called .pick, this lets us choose specific values
//.. to pass in to our Form for editing (saves us passing in irrelevant values, eg. id etc)
import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBook, editBook } from '../../actions';

// BookForm is a generalised form comp that works with BookEdit and BookCreate..
import BookForm from './BookForm';

const BookEdit = props => {
   // Fetch the current stream
   useEffect(() => {
      props.fetchBook(props.match.params.id);
   }, []);

   // When the form is submitted, pass in the form id and data
   const onSubmit = formValues => {
      props.editBook(props.match.params.id, formValues);
   };

   // If the stream hasn't yet loaded.. (if the user refreshes the page or accesses it
   //.. directly, current stream data won't have been prev loaded)
   if (!props.book) {
      return <div>Loading...</div>;
   }
   return (
      <div>
         <h3>Edit Book</h3>
         <BookForm
            initialValues={_.pick(
               props.book,
               'title',
               'subtitle',
               'author',
               'link',
               'review'
            )}
            onSubmit={onSubmit}
         />
      </div>
   );
};

const mapStateToProps = (state, ownProps) => {
   return {
      book: state.books[ownProps.match.params.id],
   };
};

export default connect(mapStateToProps, { fetchBook, editBook })(BookEdit);
