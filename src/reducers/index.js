import {combineReducers} from 'redux';
import {Auth} from './auth';

const reducers = combineReducers({
    auth: Auth
})

export default reducers;