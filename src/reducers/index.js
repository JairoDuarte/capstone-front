import {combineReducers} from 'redux';
import {Auth} from './auth';
import {User} from './user';
import { Skhera } from './skhera';

const reducers = combineReducers({
    auth: Auth,
    user: User,
    skhera: Skhera
})

export default reducers;