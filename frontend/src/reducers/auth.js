import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    AUTH_SUCCESS,
    AUTH_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    LOGOUT
} from '../actions/constants';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null
}


export default function driver(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case REGISTER_SUCCESS:
            return{
                ...state,
                isAuthenticated:false,
            }
        case AUTH_SUCCESS:
            return{
                ...state,
                isAuthenticated: true,
                
            }
        case AUTH_FAIL:
            return{
                ...state,
                isAuthenticated: false,
                
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access)
            return{
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case LOAD_USER_SUCCESS:
            return{
                ...state,
                user:payload
            }
        case LOAD_USER_FAIL:
            return{
                ...state,
                user:null
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return{
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null,
                user: null
            }
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
            return{
                ...state
            }
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return{
                ...state
            }
        default:
            return state
    }
}
