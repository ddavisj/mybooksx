// Links prevent refreshes and clearing of memory, and unnec loading of files when a user clicks a link
import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
   return (
      <div className="ui secondary pointing menu margin-auto">
         <Link to="/" className="item">
            <img
               alt="MyBooks"
               src="/mybooks-logo.png"
               style={{ width: '95px' }}
            />
         </Link>
         <div className="right menu margin-auto">
            <Link to="/search" className="item">
               <i className="search icon"></i>
               Search
            </Link>
            <GoogleAuth />
         </div>
      </div>
   );
};

export default Header;
