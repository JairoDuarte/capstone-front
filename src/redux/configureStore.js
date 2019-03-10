import {createStore, compose, combineReducers, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Auth} from './Auth';

export const ConfigureStore = () => {
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        combineReducers({
            auth: Auth
        }),
        composeEnhancer(applyMiddleware(thunk, logger)),
    );

    return store;
}