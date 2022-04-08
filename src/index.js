import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// This enables us to use Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Initialise the Redux store, with Thunk as a middleware
const store = createStore(
   reducers,
   composeEnhancers(applyMiddleware(reduxThunk))
);

// Initialise our app, wrapping it in Redux's Provider comp..
ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>,
   document.querySelector('#root')
);
