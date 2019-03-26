import * as ActionTypes from '../constants';

export const User = (state = { location: {latitude: 0, longitude: 0}, notification: '', open: false }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_NOTIFICATION:
            return { ...state, notification: action.payload, open: true };
        case ActionTypes.REMOVE_NOTIFICATION:
            return { ...state, notification: '', open: false};
        default:
            return state;
    }
};