import * as ActionTypes from '../constants';

const INITIAL_STATE =  { errMess: null, location: {latitude: 0, longitude: 0}, notification: null, open: false };

export const User = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.ADD_NOTIFICATION:
            return { ...state, notification: action.payload, open: true, errMess: null };
        case ActionTypes.REMOVE_NOTIFICATION:
            return { ...state, notification: null, open: false, errMess: null};
        case ActionTypes.ADD_LOCATION:
            return { ...state, location: action.payload, errMess: null};
        case ActionTypes.USER_FAILED:
            return { ...state, errMess: action.payload};
        
        default:
            return state;
    }
};