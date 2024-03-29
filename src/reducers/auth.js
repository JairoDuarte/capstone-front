import * as ActionTypes from '../constants';

const INITIAL_STATE = {
  errMess: null,
  user: JSON.parse(localStorage.getItem('user')),
  token: localStorage.getItem('token'),
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false
};

export const Auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true
      };

    case ActionTypes.UPDATE_USER:
      return { ...state, user: action.payload };
    case ActionTypes.ADD_LOCATION:
      return { ...state, location: action.payload };

    case ActionTypes.SIGN_OUT:
      return { ...state, user: {}, token: '', isAuthenticated: false };

    default:
      return state;
  }
};
