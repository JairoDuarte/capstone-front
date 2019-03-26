import * as ActionTypes from '../constants';
import api from '../services/api';
import { addNotification } from './user';

export const addSkheraService = (skhera) => async (dispatch) => {
    try {
        const response = await api.post(`/api/skhera/`, skhera);

        dispatch(addNotification('Your skhera is Added'));
        dispatch(addSkhera(response.data));
    } catch (e) {
        console.log(e);
    }
    return null;
}

export const addSkhera = (skhera) => ({
    type: ActionTypes.ADD_SKHERA,
    payload: skhera
})

export const notificationSkheraService = (notification) => async (dispatch) =>{
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notification.date = new Date().getTime();
    notifications.push(notification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    dispatch(notificationSkhera(notification));
}
export const acceptSkheraService = (skhera) => async (dispatch) =>{
    let notifications = JSON.parse(localStorage.getItem('notifications'));
    await api.post(`/api/skhera/accept`, {status: true, idSkhera: skhera._id})
        
    notifications.splice(notifications.indexOf(skhera), 1);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    dispatch(addNotificationsSkhera(notifications));
}
export const declineSkheraService = (skhera) => async (dispatch) =>{ 
    let notifications = JSON.parse(localStorage.getItem('notifications'));
    console.log(skhera);
    notifications.splice(notifications.indexOf(skhera), 1);
    console.log(notifications.length);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    dispatch(addNotificationsSkhera(notifications));
    try {
        await api.post(`/api/skhera/accept`, {status: false, idSkhera: skhera._id})
    } catch (e) {
        console.log(e);
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


