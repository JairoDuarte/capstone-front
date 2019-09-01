import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import App from './App';

import registerServiceWorker from './serviceWorker';
import { initializeFirebase } from './push-notification';

initializeFirebase();
registerServiceWorker();
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

if (module.hot) {
  module.hot.accept();
}
