import * as ActionTypes from '../constants';
import api from '../services/api';
import { addNotification } from './user';

export const addSkheraService = (skhera) => async (dispatch) => {
    try {
        const response = await api.post(`/api/skhera/`, skhera);

        dispatch(addNotification('Your skhera is Added'));
        return dispatch(addSkhera(response.data));
    }
    catch (error) {
        console.log(error);
        return dispatch(errorSkhera(error.message || 'Something went wrong! Retry'));
    }
}

export const addSkhera = (skhera) => ({
    type: ActionTypes.ADD_SKHERA,
    payload: skhera
})

export const notificationSkheraService = (notification) => async (dispatch) => {
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notification.date = new Date().getTime();
    notifications.push(notification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    dispatch(notificationSkhera(notification));
}
export const acceptSkheraService = (skhera) => async (dispatch) => {
    let notifications = JSON.parse(localStorage.getItem('notifications'));
    try {
        await api.post(`/api/skhera/accept`, { status: true, idSkhera: skhera._id });
        notifications.splice(notifications.indexOf(skhera), 1);
        localStorage.setItem('notifications', JSON.stringify(notifications));
        dispatch(addNotificationsSkhera(notifications));
    }
    catch (error) {
        console.log(error);
        return dispatch(errorSkhera(error.message || 'Something went wrong! Retry'));
    }

}
export const declineSkheraService = (skhera) => async (dispatch) => {
    try {
        await api.post(`/api/skhera/accept`, { status: false, idSkhera: skhera._id });
        let notifications = JSON.parse(localStorage.getItem('notifications'));
        notifications.splice(notifications.indexOf(skhera), 1);
        localStorage.setItem('notifications', JSON.stringify(notifications));
        dispatch(addNotificationsSkhera(notifications));

    } 
    catch (error) {
        console.log(error);
        return dispatch(errorSkhera(error.message || 'Something went wrong! Retry'));
    }

}

export const notificationSkhera = (notification) => ({
    type: ActionTypes.NOTIFICATION_SKHERA,
    payload: notification
})
export const addNotificationsSkhera = (notifications) => ({
    type: ActionTypes.NOTIFICATIONS_SKHERA,
    payload: notifications
})


export const getSkheraService = () => async (dispatch) => {
    try {
        console.log('get');
        const response = await api.get(`/api/skhera/`);
        dispatch(addSkheras(response.data));
    } catch (error) {
        console.log(error);
        return dispatch(errorSkhera(error.message || 'Something went wrong! Retry'));
    }
}

export const addSkheras = (skheras) => ({
    type: ActionTypes.ADD_SKHERAS,
    payload: skheras
})


export const errorSkhera = (errormess) => ({
    type: ActionTypes.SKHERA_FAILED,
    payload: errormess
})