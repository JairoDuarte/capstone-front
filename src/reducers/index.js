import {combineReducers} from 'redux';
import {Auth} from './auth';
import {User} from './user';

const reducers = combineReducers({
    auth: Auth,
    user: User
})

export default reducers;