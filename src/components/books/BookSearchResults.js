import './BookSearchResults.css';

import React from 'react';
import { connect } from 'react-redux';

import { searchGoogleBooks, createBook } from '../../actions';
import history from '../../history';

const BookSearchResults = props => {
   const renderBookResults = () => {
      // The bookSearchResults arr exists but is empty!
      if (props.bookSearchResults.length === 0) {
         history.push('/search');
         return;
      }

      return props.bookSearchResults.map(book => {
         const author = book.volumeInfo.authors
            ? book.volumeInfo.authors[0]
            : 'Author: Unknown';

         const title = book.volumeInfo.title;

         const subtitle = book.volumeInfo.subtitle
            ? book.volumeInfo.subtitle
            : '';

         const thumbNail = book.volumeInfo.imageLinks
            ? book.volumeInfo.imageLinks.smallThumbnail
            : '';

         const description = book.volumeInfo.description
            ? book.volumeInfo.description
            : '';

         const renderAddBook = () => {
            if (props.isSignedIn) {
               return (
                  <button
                     onClick={() => {
                        props.createBook({
                           title,
                           subtitle,
                           author,
                           thumbNail,
                           description,
                        });
                     }}
                     className="ui button"
                  >
                     Add book!
                  </button>
               );
            }
         };

         return (
            <div className="item" key={book.id}>
               <img className="image small" src={thumbNail} alt={thumbNail} />
               <div className="content">
                  <div className="header">{title}</div>
                  <div className="description">{subtitle}</div>
                  <div className="description">{author}</div>
                  <div className="description">
                     {description ? <span>&#10004; Desc</span> : ''}
                  </div>
               </div>
               {renderAddBook()}
            </div>
         );
      });
   };

   return (
      <div>
         <h3>Book Search Results</h3>
         <div className="book-search-results ui middle aligned divided list">
            {renderBookResults()}
         </div>
      </div>
   );
};

const mapStateToProps = state => {
   return {
      bookSearchResults: Object.values(state.bookSearchResults),
      isSignedIn: state.auth.isSignedIn,
   };
};

export default connect(mapStateToProps, { createBook, searchGoogleBooks })(
   BookSearchResults
);