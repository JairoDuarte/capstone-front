import * as ActionTypes from '../constants';

export const signin = (user) => (dispatch) => {
    localStorage.setItem('user', JSON.stringify(user.user));
    localStorage.setItem('token', JSON.stringify(user.token));
    localStorage.setItem('isAuthenticated', JSON.stringify(true));

    return dispatch(authSignin(user))
}
export const signout = () => (dispatch) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');

    return dispatch(authSignout());
}

export const authSignin = (user) => ({
    type: ActionTypes.SIGN_IN,
    payload: user
})
export const authSignout = () => ({
    type: ActionTypes.SIGN_OUT,
    payload: {}
})