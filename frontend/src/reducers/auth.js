import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    AUTH_SUCCESS,
    AUTH_FAIL,
    LOGOUT
} from '../actions/constants';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null
}


export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){
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
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return{
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null,
                user: null
            }
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
        default:
            return state
    }
}
