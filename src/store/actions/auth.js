import { login } from '../../api';
import jwt_decode from 'jwt-decode';
import { DesignationEnum } from '../../utils/constants';

import * as actionTypes from './action-types';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token) => {
	const decoded = jwt_decode(token);
	const expiresIn = decoded.expiresIn;
	const userID = decoded.userID;
	const accType = decoded.accType;
	const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

	localStorage.setItem('token', token);
	localStorage.setItem('expirationDate', expirationDate);
	localStorage.setItem('userID', userID);

	//setting account type
	//if system officer
	if (Object.values(DesignationEnum).includes(accType)) {
		localStorage.setItem('accType', accType);
	}
	//if user
	else {
		localStorage.setItem('accType', DesignationEnum.USER);
		localStorage.setItem('userType', accType);
	}
    dispatch(checkAuthTimeout(expiresIn));
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		userID: userID,
		accType: accType,
		userType: userType,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userID');
	localStorage.removeItem('accType');
	localStorage.removeItem('userType');
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const auth = (email, password, onLogin) => {
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
		};
		console.log(authData);
		login(authData).then((result) => {
			if (result.data) {
				dispatch(authSuccess(result.data));
				onLogin();
			} else {
				dispatch(authFail(result.message));
			}
		});
	};
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};

export const authCheckState = () => {
	return (dispatch) => {
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
