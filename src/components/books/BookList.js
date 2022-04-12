// This comp lists all available streams on the index page

import './BookList.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchBooks } from '../../actions';
import Footer from '../Footer';
import Spinner from '../Spinner';

// Destructure all props in the comp definition
const BookList = ({ fetchBooks, currentUserId, books, isSignedIn }) => {
   const [imgsLoaded, setImgsLoaded] = useState(false);

   useEffect(() => {
      const awaitFetchBooks = async () => {
         await fetchBooks();
      };
      awaitFetchBooks();

      const loadImage = imageUrl => {
         return new Promise((resolve, reject) => {
            const loadImg = new Image();
            loadImg.src = imageUrl;
            loadImg.onload = () => resolve(imageUrl);

            loadImg.onerror = err => reject(err);
         });
      };

      const bookThumbnails = books.map(book => {
         return book.thumbNail;
      });

      const awaitImages = async () => {
         await Promise.all(bookThumbnails.map(imageUrl => loadImage(imageUrl)))
            .then(() => {
               console.log('All loaded!');
               setImgsLoaded(true);
            })
            .catch(err => console.log('Failed to load images', err));
      };
      awaitImages();
   }, []);

   const renderImage = book => {
      if (book.thumbNail) {
         return (
            <Link className="image" to={`/books/${book.id}`}>
               <img src={book.thumbNail} alt={book.thumbNail} />
            </Link>
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

   // Show the create button if user is signed in
   const renderAddBook = () => {
      if (isSignedIn) {
         return (
            <div style={{ textAlign: 'center' }}>
               <Link to="/search" className="ui button primary">
                  + Add a New Book
               </Link>
               <div>&nbsp;</div>
            </div>
         );
      }
   };

   // Map all available books - show book title and desc and admin options if user is signed in
   const renderList = () => {
      return books.map(book => {
         return (
            <div className="item" key={book.id}>
               {renderAdmin(book, 'wide-only right floated')}
               {renderImage(book)}
               <div className="content">
                  <Link to={`/books/${book.id}`} className="header">
                     <h2>{book.title}</h2>
                  </Link>
                  {renderSubtitle(book)}
                  <div className="description">
                     <h3 style={{ textTransform: 'capitalize' }}>
                        {book.author.toLowerCase()}
                     </h3>
                  </div>
               </div>
               {renderAdmin(book, 'mobile-only')}
            </div>
         );
      });
   };

   // If user is signed in, show them edit and delete links
   const renderAdmin = (book, deviceClasses) => {
      if (book.userId === currentUserId) {
         return (
            <div
               className={`${deviceClasses} render-admin content middle aligned`}
            >
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

   if (imgsLoaded) {
      return (
         <div>
            <h2>My Books</h2>
            <div className="book-list ui middle aligned divided list">
               {renderList()}
            </div>
            {renderAddBook()}
            <div>&nbsp;</div>
            <Footer />
         </div>
      );
   }
   return (
      <div>
         <h2>My Books</h2>
         <div className="book-list ui middle aligned divided list"></div>
         <Spinner message="Loading.." />
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
