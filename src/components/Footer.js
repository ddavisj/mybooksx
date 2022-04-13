// Display a v basic footer - only used in BookList

import React from 'react';

const Footer = () => {
   const year = new Date().getFullYear();

   return (
      <footer className="footer ui center aligned container">
         <div>
            <h4>
               <a
                  id="EALink"
                  href="https://eadigital.com.au"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'black', textDecoration: 'underline' }}
               >
                  ©{year} EA Digital
               </a>
            </h4>
            <p>&nbsp;</p>
         </div>
      </footer>
   );
};

export default Footer;
