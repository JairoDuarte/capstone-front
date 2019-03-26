import * as ActionTypes from '../constants';

const INITIAL_STATE = { errMess: null, skheras: [], notifications: JSON.parse(localStorage.getItem('notifications')) || [] };

export const Skhera = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    
        case ActionTypes.ADD_SKHERAS:
            return { ...state, skheras: action.payload, errMess: null};
        case ActionTypes.ADD_SKHERA:
            return { ...state, skheras: state.skheras.concat(action.payload), errMess: null};
        case ActionTypes.NOTIFICATION_SKHERA:
            return { ...state, notifications: state.notifications.concat(action.payload), errMess: null};
        case ActionTypes.NOTIFICATIONS_SKHERA:
            return { ...state, notifications: action.payload, errMess: null};
        case ActionTypes.SKHERA_FAILED:
            return { ...state, errMess: action.payload};
        default:
            return state;
    }
};