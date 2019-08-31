import { createStore, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Reducers from '../reducers';

export const ConfigureStore = () => {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(Reducers, composeEnhancer(applyMiddleware(thunk, logger)));

  return store;
};
