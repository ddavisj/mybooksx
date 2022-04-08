// Export a pre-defined Axios client to simplify interaction with the API

import axios from 'axios';

export default axios.create({
   baseURL: 'http://localhost:3001',
   // baseURL: 'https://mybooks-api.herokuapp.com/',
});
