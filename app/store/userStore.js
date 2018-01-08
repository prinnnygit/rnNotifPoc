import { USER_LOGIN, USER_LOGOUT } from './userTypes';

const { createStore } = require('redux');

const defaultState = {
    user: ''
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                user: {
                    username: action.username || state
                }
            };
        case USER_LOGOUT:
            return state = defaultState;
        default:
            return state;
    }
}

const userStore = createStore(reducer);

userStore.subscribe(() => {
    return userStore.getState();
});

module.exports = userStore;