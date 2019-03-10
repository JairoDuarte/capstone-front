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
/*
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});


export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {
    
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});*/