import * as ActionTypes from '../constants';
import api from '../services/api';

export const updateUserService = (user) => async (dispatch) => {
    try {

        await api.put(`/api/users/${user.id}`, user)
        const response = await api.get('/api/users/me')
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch(addNotification('Profile Updated'));
        return dispatch(updateUser(response.data));
    
    } catch (error) {
       console.log(error);
       return dispatch(errorUser(error.message || 'Something went wrong! Retry'));

    }
}
export const updateUserStatus = (status) => async (dispatch) => {
    try {
        console.log(status);
        const response = await api.post(`/api/users/status`, {status: status});
        localStorage.setItem('user', JSON.stringify(response.data));
        return dispatch(updateUser(response.data));
    
    
    } catch (error) {
        console.log(error);
        return dispatch(errorUser(error.message || 'Something went wrong! Retry'));
    }
}


export const updateUser = (user) => ({

    type: ActionTypes.UPDATE_USER,
    payload: user
})

export const addLocation = (location) => ({
    type: ActionTypes.ADD_LOCATION,
    payload: location
})
export const addNotification = (notification) => ({
    type: ActionTypes.ADD_NOTIFICATION,
    payload: notification
})
export const removeNotification = () => ({
    type: ActionTypes.REMOVE_NOTIFICATION,
    payload: ''
})

export const errorUser = (errormess) => ({
    type: ActionTypes.USER_FAILED,
    payload: errormess
})
