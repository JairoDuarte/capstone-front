import * as ActionTypes from '../constants';

const INITIAL_STATE = { errMess: null, skhera: [], notifications: JSON.parse(localStorage.getItem('notifications')) || [] };

export const Skhera = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    
        case ActionTypes.ADD_SKHERAS:
            return { ...state, skhera: action.payload};
        case ActionTypes.ADD_SKHERA:
            return { ...state, skhera: state.skhera.concat(action.payload)};

        default:
            return state;
    }
};