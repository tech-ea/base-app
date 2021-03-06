import React, { createContext } from 'react';
import ReactDOM from 'react-dom';

import 'typeface-roboto';
// import './index.css';
import Firebase from 'api/Firebase';

import App from './App';
import * as serviceWorker from './serviceWorker';
const FirebaseContext = createContext(null);

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
