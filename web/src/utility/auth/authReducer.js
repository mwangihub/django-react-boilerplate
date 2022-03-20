import *  as authAction from './authActionTypes';

const objectUpdate = (state, updatedState) => {
    /*
    * For convenience of updading application state
    */
    return {
        ...state, ...updatedState
    }
}

const innitialState = {
    /*
    * Application state for authentication only
    */
    authLoader: false,
    token: null,
    authError: null,
    authEmail: null,
    authiInfo: null,

    userEmail: null,
    userFName: null,
    userLName: null,
    userAdmin: false,
    userActive: null
}

/*
* THESE METHODS UPDATES THE APPLICATION STATE BASED ON DATA RECEIVED
* FROM API CALLS & MODIFYING THE APPLCATION STATE
*/
const authStart = (state, action) => {
    return objectUpdate(state, {
        authError: null,
        authLoader: true
    })
}
const authSuccess = (state, action) => {
    return objectUpdate(state, {
        authError: null,
        authLoader: false,
        token: action.token,
        userEmail: action.userEmail,
        userFName: action.userFName,
        userLName: action.userLName,
        userAdmin: action.userAdmin,
        userActive: action.userActive,
    })
}
const authFail = (state, action) => {
    return objectUpdate(state, {
        authError: action.error,
        authLoader: false,
        authiInfo: null,
        token: null
    })
}
const authLogout = (state, action) => {
    return objectUpdate(state, {
        authLoader: false,
        token: null,
        userEmail: null,
        userFName: null,
        userLName: null,
        userAdmin: false,
        userActive: null
    })
}


const authReducer = (state = innitialState, action) => {
    /*
    * REDUCER => PROVIDE THE STATE TO THE WHOLE APPLICATION
    */
    switch (action.type) {
        case authAction.AUTH_START: return authStart(state, action);
        case authAction.AUTH_SUCCESS: return authSuccess(state, action);
        case authAction.AUTH_FAIL: return authFail(state, action);
        case authAction.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }
}
export default authReducer;