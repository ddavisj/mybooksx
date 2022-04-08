// This comp lists all available streams on the index page

import './BookList.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchBooks } from '../../actions';

// Destructure all props in the comp definition
const BookList = ({ fetchBooks, currentUserId, books, isSignedIn }) => {
   // Fetch all books
   useEffect(() => {
      fetchBooks();
   }, []);

   // If user is signed in, show them edit and delete links
   const renderAdmin = book => {
      if (book.userId === currentUserId) {
         return (
            <div className="render-admin right floated content middle aligned">
               <Link to={`/books/edit/${book.id}`} className="ui button">
                  <i className="middle aligned icon edit" />
               </Link>
               <Link to={`/books/delete/${book.id}`} className="ui button">
                  <i className="middle aligned icon trash" />
               </Link>
            </div>
         );
      }
   };

   const renderImage = book => {
      if (book.thumbNail) {
         return (
            <a className="image" href={`/books/${book.id}`}>
               <img src={book.thumbNail} alt={book.thumbNail} />
            </a>
         );
      } else {
         return <i className="large middle aligned icon book" />;
      }
   };

   const renderSubtitle = book => {
      if (book.subtitle) {
         return (
            <div className="sub header">
               <h3>{book.subtitle}</h3>
               <div>&nbsp;</div>
            </div>
         );
      } else {
         return;
      }
   };

   // Map all available books - show book title and desc and admin options if user is signed in
   const renderList = () => {
      return books.map(book => {
         return (
            <div className="item" key={book.id}>
               {renderAdmin(book)}
               {renderImage(book)}
               <div className="content">
                  <Link to={`/books/${book.id}`} className="header">
                     <h2>{book.title}</h2>
                  </Link>
                  {renderSubtitle(book)}
                  <div className="description">
                     <h3>{book.author}</h3>
                  </div>
               </div>
            </div>
         );
      });
   };

   // Show the create button if user is signed in
   const renderCreate = () => {
      if (isSignedIn) {
         return (
            <div style={{ textAlign: 'center' }}>
               <Link to="/search" className="ui button primary">
                  + Add Book
               </Link>
               <div>&nbsp;</div>
            </div>
         );
      }
   };

   return (
      <div>
         <h2>My Books</h2>
         <div className="book-list ui middle aligned divided list">
            {renderList()}
         </div>
         {renderCreate()}
      </div>
   );
};

// Object.values returns an array from the values of an obj - so we're
//.. converting the books obj into an array of objects..
//.. This lets us map the books array in the normal way
const mapStateToProps = state => {
   return {
      books: Object.values(state.books),
      currentUserId: state.auth.userId,
      isSignedIn: state.auth.isSignedIn,
   };
};

export default connect(mapStateToProps, { fetchBooks })(BookList);
