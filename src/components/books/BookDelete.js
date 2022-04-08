// This comp was converted to a functional comp from a CBC, useEffect is employed to fetch the current stream's data
import React, { useEffect } from 'react';

import { connect } from 'react-redux';

// Bc this comp incorporates a Link to cancel a proposed action, we need to use the RRD Link comp
import { Link } from 'react-router-dom';

// The fetchStream AC allows us to show the user the name of the stream to be deleted
import { fetchBook, deleteBook } from '../../actions';

// Our own modal comp
import Modal from '../Modal';

// Enables us to programmatically change the url when an action occurs
import history from '../../history';

const BookDelete = props => {
   // Use the useEffect hook to load the current stream via its params id into the Redux store
   useEffect(() => {
      props.fetchBook(props.match.params.id);
   }, []);

   // renderActions makes use of React.fragment, here shortened to <>
   const renderActions = () => {
      // Extract the current stream id from the params, then pass this into
      //.. the button with assoc AC to delete this specific stream
      const { id } = props.match.params;
      return (
         <>
            <button
               onClick={() => props.deleteBook(id)}
               className="ui button negative"
            >
               Delete
            </button>
            {/* If the user cancels a proposed stream deletion, redirect home */}
            <Link className="ui button" to={'/'}>
               Cancel
            </Link>
         </>
      );
   };

   const renderContent = () => {
      if (!props.book) {
         return 'Are you sure you want to delete the book:';
      }
      return `Are you sure you want to delete the book: ${props.book.title}?`;
   };

   // Pass all relevant props to our Modal comp. Our Modal is optimised for reusability
   return (
      <Modal
         title="Delete Book"
         content={renderContent()}
         actions={renderActions()}
         onDismiss={() => history.push('/')}
      />
   );
};

// Extract the current stream from the store and pass it into this comp
//.. so it can give the user info about the stream to be deleted
const mapStateToProps = (state, ownProps) => {
   return {
      book: state.books[ownProps.match.params.id],
   };
};

// Pass in mSTP as the first arg, and the relevant ACs for this comp
export default connect(mapStateToProps, { fetchBook, deleteBook })(BookDelete);
