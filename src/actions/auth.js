import * as ActionTypes from '../constants';

export const signin = data => dispatch => {
  localStorage.setItem('user', JSON.stringify(data.user));
  localStorage.setItem('token', data.token);
  localStorage.setItem('isAuthenticated', JSON.stringify(true));

  return dispatch(authSignin(data));
};
export const signout = () => dispatch => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('isAuthenticated');

  return dispatch(authSignout());
};

export const authSignin = user => ({
  type: ActionTypes.SIGN_IN,
  payload: user
});
export const authSignout = () => ({
  type: ActionTypes.SIGN_OUT,
  payload: {}
});
