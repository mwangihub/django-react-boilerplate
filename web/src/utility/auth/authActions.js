import *  as action from './authActionTypes';
import axios from 'axios';
const TIME_22_HRS_SECS = 79200 * 1000;
const TIME_22_HRS = 79200;
/* 
* THESE ACTIONS RETURNS AN OBJECT WITH ACTION TYPE
* IF THE THERE IS DATA FROM API CALL, IT IS PLACED IN 
* THE OBJECT
*/
export const authStart = () => {
    return {
        type: action.AUTH_START
    }
}
export const authSuccess = (token, userEmail, userFName, userLName, userAdmin, userActive) => {
    return {
        type: action.AUTH_SUCCESS,
        token: token,
        userEmail: userEmail,
        userFName: userFName,
        userLName: userLName,
        userAdmin: userAdmin,
        userActive: userActive,
    }
}
export const authFail = error => {
    return {
        type: action.AUTH_FAIL,
        error: error
    }
}
export const logout = () => {
    /*
     * basically removing token, email if any and expiration date
     * from localstorage then, we send API call for logout
     * not neccessary but important if the session was stored in the backend
     */
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userFName');
    localStorage.removeItem('userLName');
    localStorage.removeItem('userActive');
    localStorage.removeItem('userAdmin');
    localStorage.removeItem('expirationDate');
    axios.post('http://localhost:8000/api/logout/', {})
    // .then(res => {
    //     console.log(res.data);
    // }).catch(e => {
    //     console.log(e);
    // })
    return {
        type: action.AUTH_LOGOUT
    }
}
const checkAuthTimeout = expirationTime => {
    /*
     * if 22 hours is gone, we logout the user
     * i.e timer 
     */
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000);
    }
}

export const checkTokenState = () => {
    /*
    * THIS METHOD DISPATCHES A SPECIFIC ACTIONS(as decribed above in line 4) WHICH RETURNS
    * AN OBJECT WITH ACTION TYPE 
    */
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    const userFName = localStorage.getItem('userFName');
    const userLName = localStorage.getItem('userLName');
    const userAdmin = localStorage.getItem('userAdmin');
    const userActive = localStorage.getItem('userActive');
    return dispatch => {
        if (token === null) {
            dispatch(logout());
        } else {
            const expireDate = new Date(localStorage.getItem('expirationDate'));
            if (expireDate <= new Date()) {
                dispatch(logout());
            } else {
                /**
                 * This block should be used to send refreshing tokens.
                 */
                dispatch(authSuccess(token, userEmail, userFName, userLName, JSON.parse(userAdmin), JSON.parse(userActive)));
                dispatch(checkAuthTimeout((expireDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}

export const authLogin = (email, password) => {
    /*
    * THIS METHOD DISPATCHES A SPECIFIC ACTIONS(as decribed above in line 4) WHICH RETURNS
    * AN OBJECT WITH ACTION TYPE 
    */
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:8000/api/login/', {
            username: '',
            email: email,
            password: password
        }).then(res => {
            const token = res.data.key;
            const userEmail = res.data.user["email"]
            const userFName = res.data.user["first_name"]
            const userLName = res.data.user["last_name"]
            const userAdmin = res.data.user["is_admin"]
            const userActive = res.data.user["is_active"]
            /*
            * 22 hours in future expirationDate
            */
            const expirationDate = new Date(new Date().getTime() + TIME_22_HRS_SECS);
            localStorage.setItem('token', token);
            localStorage.setItem('userEmail', userEmail);
            localStorage.setItem('userFName', userFName);
            localStorage.setItem('userLName', userLName);
            localStorage.setItem('userActive', userActive);
            localStorage.setItem('userAdmin', userAdmin);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token, userEmail, userFName, userLName, userAdmin, userActive));
            dispatch(checkAuthTimeout(TIME_22_HRS));
        }).catch(error => {
            if (error.response) {
                let res = error.response;
                dispatch(authFail(res.data['non_field_errors'][0]))
            } else if (error.request) {
                dispatch(authFail(error.request))
            } else {
                dispatch(authFail("Another error occured"))
            }
        })
    }
}

export const authSignUp = (email, password1, password2) => {
    /*
    * THIS METHOD DISPATCHES A SPECIFIC ACTIONS(as decribed above in line 4) WHICH RETURNS
    * AN OBJECT WITH ACTION TYPE 
    */
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:8000/api/registration/', {
            email: email,
            password1: password1,
            password2: password2,
        }).then(res => {
            console.log(res);
            const token = res.data.key;
            const userEmail = res.data.user["email"]
            const userFName = res.data.user["first_name"]
            const userLName = res.data.user["last_name"]
            const userAdmin = res.data.user["is_admin"]
            const userActive = res.data.user["is_active"]
            /*
            * 22 hours in future expirationDate
            */
            const expirationDate = new Date(new Date().getTime() + TIME_22_HRS_SECS);
            localStorage.setItem('token', token);
            localStorage.setItem('userEmail', userEmail);
            localStorage.setItem('userFName', userFName);
            localStorage.setItem('userLName', userLName);
            localStorage.setItem('userActive', userActive);
            localStorage.setItem('userAdmin', userAdmin);
            localStorage.setItem('expirationDate', expirationDate);
            /**
             * We login the user by default for now.
             */
            dispatch(authSuccess(token, userEmail, userFName, userLName, userAdmin, userActive));
            dispatch(checkAuthTimeout(TIME_22_HRS));
        }).catch(error => {
            if (error.response) {
                let res = error.response.data;
                dispatch(authFail(res))
            } else if (error.request) {
                console.log(error.request);
                dispatch(authFail(error.request))
            } else {
                dispatch(authFail("Another error occured"))
            }
        })
    }
}