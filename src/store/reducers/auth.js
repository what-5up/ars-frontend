import * as actionTypes from '../actions/action-types';
import { updateObject } from '../../utils/helpers';
import { AUTH_REDIRECT_PATH } from '../../utils/constants';

const initialState = {
    token: null,
    userID: null,
    accType: null,
    userType: null,
    userAuthenticated: false,
    error: null,
    loading: false,
    authRedirectPath: AUTH_REDIRECT_PATH
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.token,
        userID: action.userID,
        accType: action.accType,
        userType: action.userType,
        userAuthenticated: action.userAuthenticated,
        error: null,
        loading: false
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userID: null, accType: null, userType: null, userAuthenticated: false });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default:
            return state;
    }
};

export default reducer;