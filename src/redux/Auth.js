import * as ActionTypes from './ActionTypes';

export const Auth = (state = { errMess: null, user: JSON.parse(localStorage.getItem('user')), token: JSON.parse(localStorage.getItem('token')), isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false  }, action) => {
    switch (action.type) {
        case ActionTypes.SIGN_IN:
            return { ...state, user: action.payload.user, token: action.payload.token, isAuthenticated: true };

        case ActionTypes.UPDATE_USER:
            return { ...state, user: action.payload};
        case ActionTypes.SIGN_OUT:
        return { ...state, user: {}, token: '', isAuthenticated: false  };

        default:
            return state;
    }
};