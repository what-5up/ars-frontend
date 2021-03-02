import { login, addGuest } from '../../api';
import jwt_decode from "jwt-decode";
import { DesignationEnum } from '../../utils/constants';

import * as actionTypes from './action-types';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userID, accType, userType) => {
    console.log(accType);
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userID: userID,
        accType: accType,
        userType: userType

    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userID');
    localStorage.removeItem('accType');
    localStorage.removeItem('userType');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const systemAuth = (email, password, onLogin) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        };
        console.log(authData);
        login(authData).then(result => {
            if (result.data) { 
                //decoding the jwt token
                const token = result.data;
                const decoded = jwt_decode(token);
                const expiresIn = decoded.expiresIn;
                const userID = decoded.userID;
                let accType = decoded.accType;
				let userType = null;
                const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userID', userID);

				if (!Object.values(DesignationEnum).includes(accType)) {
					accType  = DesignationEnum.USER;
					userType = accType;
				}
			
				localStorage.setItem('accType', accType);
				localStorage.setItem('userType', userType);

				dispatch(authSuccess(token, userID, accType, userType))
			
                onLogin();
                dispatch(checkAuthTimeout(expiresIn));
            }
            else {
                dispatch(authFail(result.message));
            }
        });
    };
};

export const guestAuth = (values, routeForward) => {
    return dispatch => {
        dispatch(authStart());

        addGuest(values).then(result => {
            if (result.data) { 
                //decoding the jwt token
                const token = result.data;
                const decoded = jwt_decode(token);
                const expiresIn = decoded.expiresIn;
                const userID = decoded.userID;
                const accType = decoded.accType;
				const userType = null;
                const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userID', userID);
				localStorage.setItem('accType', accType);
				localStorage.setItem('userType', userType);
			
				routeForward({id: userID, isGuest: true});
				dispatch(authSuccess(token, userID, accType, userType))
                dispatch(checkAuthTimeout(expiresIn));
            }
            else {
                dispatch(authFail(result.message));
            }
        });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userID = localStorage.getItem('userID');
                const accType = localStorage.getItem('accType');
                const userType = localStorage.getItem('userType');
                dispatch(authSuccess(token, userID, accType, userType));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};