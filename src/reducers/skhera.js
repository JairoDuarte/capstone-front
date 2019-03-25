import * as ActionTypes from '../constants';

const INITIAL_STATE = { errMess: null, skheras: [], notifications: JSON.parse(localStorage.getItem('notifications')) || [] };

export const Skhera = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    
        case ActionTypes.ADD_SKHERAS:
            return { ...state, skheras: action.payload};
        case ActionTypes.ADD_SKHERA:
            return { ...state, skheras: state.skheras.concat(action.payload)};
        case ActionTypes.NOTIFICATION_SKHERA:
            return { ...state, notifications: state.notifications.concat(action.payload)};
        case ActionTypes.NOTIFICATIONS_SKHERA:
            return { ...state, notifications: action.payload};
        default:
            return state;
    }
};