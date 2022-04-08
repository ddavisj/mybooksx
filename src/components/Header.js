// Links prevent refreshes and clearing of memory, and unnec loading of files when a user clicks a link

import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
   return (
      <div className="ui secondary pointing menu">
         <Link to="/" className="item">
            MyBooks
         </Link>
         <div className="right menu">
            <Link to="/search" className="item">
               Book Search
            </Link>
            <Link to="/" className="item">
               All Books
            </Link>
            <GoogleAuth />
         </div>
      </div>
   );
};

export default Header;
