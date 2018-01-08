import { USER_LOGIN, USER_LOGOUT } from './userTypes';

export function userLogin(username) {
    return {
        type: USER_LOGIN,
        username: username,
    };
}

export function userLogout() {
    return {
        type: USER_LOGOUT
    }
}