import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    AUTH_SUCCESS,
    AUTH_FAIL,
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

export const login = (email, password) => async dispatch =>{
    console.log(process.env.REACT_APP_API_URL);
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

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};