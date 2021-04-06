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
} from './constants';
import axios from 'axios';
export const check_authenticated = () => async dispatch =>{
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        const body = JSON.stringify({"token": localStorage.getItem('access')});
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)
            if(res.data.code === 'token_not_valid'){
                dispatch({
                    type: AUTH_FAIL
                }) 
            }else{
                dispatch({
                    type: AUTH_SUCCESS
                }) 
            }
        } catch (error) {
            dispatch({
                type: AUTH_FAIL
            })    
        }
    }else{
        dispatch({
            type: AUTH_FAIL
        })
    }
}
export const load_user = () => async dispatch =>{
    if(localStorage.getItem('access')){
        const config = {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        try{
            //passes back the user object
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);//handled by djoser
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: res.data//Access and Refresh token
            });
        }catch(err){
            dispatch({
                type: LOAD_USER_FAIL
            });
        }

    }else{
        dispatch({
            type: LOAD_USER_FAIL
        });
    }
};

export const register = (first_name, last_name, email, password, re_password) => async dispatch => {
    console.log(first_name, last_name, email, password, re_password);
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ "first_name":first_name, "last_name":last_name, "email":email, "password":password, "re_password":re_password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        })
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
};


export const login = (email, password) => async dispatch =>{

    const config = {
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    console.log(email, password)
    const body = JSON.stringify({"email":email,"password":password});
    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data//Access and Refresh token
        });
        dispatch(load_user());
    }catch(err){
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const logout_user = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};