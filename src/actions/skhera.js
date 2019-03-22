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