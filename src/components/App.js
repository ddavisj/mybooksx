import './App.css';

import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';

import Header from './Header';
import Device from './Device';

import BookList from './books/BookList';
import BookEdit from './books/BookEdit';
import BookDelete from './books/BookDelete';
import BookShow from './books/BookShow';
import BookSearch from './books/BookSearch';
import BookSearchResults from './books/BookSearchResults';

// Here, we're creating our own Router and passing in the history obj,
//.. this lets us redirect from within action creators..
// To keep a fixed header for each comp, include the Header comp within Router
// Switch ensures that only one comp is rendered for each path, the 1st found..
// Router params (eg. :id), allow us to pass params into components via the url

const App = () => {
   return (
      // <div className="ui container">
      <Device className="ui container">
         <Router history={history}>
            <div>
               <Header />
               <Switch>
                  <Route path="/search" exact component={BookSearch} />
                  <Route
                     path="/search-results"
                     exact
                     component={BookSearchResults}
                  />
                  <Route path="/" exact component={BookList} />
                  {/* <Route path="/streams/new" exact component={StreamCreate} /> */}
                  <Route path="/books/:id" exact component={BookShow} />
                  <Route path="/books/edit/:id" exact component={BookEdit} />
                  <Route
                     path="/books/delete/:id"
                     exact
                     component={BookDelete}
                  />
               </Switch>
            </div>
         </Router>
      </Device>
      // </div>
   );
};

export default App;
