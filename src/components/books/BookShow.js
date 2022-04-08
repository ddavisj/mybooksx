import './BookShow.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchBook } from '../../actions';

const BookShow = ({ match, book, fetchBook, currentUserId }) => {
   useEffect(() => {
      fetchBook(match.params.id);
   }, []);

   if (!book) {
      return <div>Loading...</div>;
   }

   const {
      title,
      subtitle,
      author,
      thumbNail,
      description,
      link,
      review,
      userId,
   } = book;

   const renderLink = () => {
      if (link) {
         return (
            <h4>
               <a href={link} title={link} target="_blank">
                  Official Website
               </a>
            </h4>
         );
      }
   };
   const renderReview = () => {
      if (review) {
         return (
            <h4>
               <a href={review} title={review} target="_blank">
                  Review
               </a>
            </h4>
         );
      }
   };

   const renderAdmin = () => {
      if (userId === currentUserId) {
         return <a href={`/books/edit/${book.id}`}>Edit</a>;
      }
   };

   return (
      <div className="show-book ui items">
         <div className="item">
            <div className="ui small image">
               <img src={thumbNail} alt={thumbNail} />
               <div>{renderAdmin()}</div>
            </div>
            <div className="content">
               <h2>{title}</h2>
               <div className="description">
                  <h4>{subtitle}</h4>
               </div>
               <h3>{author}</h3>
               <p>{description}</p>
               {renderLink()}
               {renderReview()}
            </div>
         </div>
      </div>
   );
};

const mapStateToProps = (state, ownProps) => {
   return {
      book: state.books[ownProps.match.params.id],
      currentUserId: state.auth.userId,
   };
};

export default connect(mapStateToProps, { fetchBook })(BookShow);
