import * as ActionTypes from './ActionTypes';
import api from '../services/api';

export const signin = (user) => (dispatch) => {
    localStorage.setItem('user', JSON.stringify(user.user));
    localStorage.setItem('token', JSON.stringify(user.token));
    localStorage.setItem('isAuthenticated', JSON.stringify(true));

    return dispatch(authSignin(user))
}
export const signout = (user) => (dispatch) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');

    return dispatch(authSignout())
}
export const updateUserService = (user) => async (dispatch) => {
    try {
        await api.put(`/api/users/${user.id}`, user)
        const response = await api.get('/api/users/me')
        localStorage.setItem('user', JSON.stringify(response.data));
        return dispatch(updateUser(response.data))
    
    } catch (e) {
        console.log(e);
    }
    return null
}

export const addSkheraService = (skhera) => async (dispatch) => {
    try {
        const response = await api.post(`/api/skhera/`, skhera)
        console.log(response);
        
    } catch (e) {
        console.log(e);
    }
    return null
}
export const getSkheraService = (skhera) => async (dispatch) => {
    try {
        const response = await api.get(`/api/skhera/`, skhera)
        console.log(response);
        localStorage.setItem('skhera', JSON.stringify(response.data));
        dispatch(getSkhera(response.data))
        
    } catch (e) {
        console.log(e);
    }
    return null
}
export const getSkhera = (skhera) => ({
    type: ActionTypes.GET_SKHERA,
    payload: skhera
})
export const updateUser = (user) => ({

    type: ActionTypes.UPDATE_USER,
    payload: user
})
export const authSignin = (user) => ({
    type: ActionTypes.SIGN_IN,
    payload: user
})
export const authSignout = () => ({
    type: ActionTypes.SIGN_OUT,
    payload: {}
})