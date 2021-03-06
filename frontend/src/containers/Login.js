import React, { useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect } from 'react-redux';
import {login} from '../actions/auth';
const Login = ({login, isAuthenticated}) =>{
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    };

    //Check if user is authenticated
    if(isAuthenticated){
        return <Redirect to='/' />
    }
    return(
        <section className="container col-lg-8 col-sm-12 col-md-8 mx-auto bg-white shadow rounded p-5" id="login_section">
            <div className='container'>
                <h1>Login</h1>
                <p>Sign into your Account</p>
                <form onSubmit={e => onSubmit(e)}>
                    <div className='form-group'>
                        <input
                            className='form-control'
                            type='email'
                            placeholder='Email'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            className='form-control'
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={password}
                            onChange={e => onChange(e)}
                            minLength='6'
                            required
                        />
                    </div>
                    <button className='btn btn-primary' type='submit'>Login</button>
                </form>
                <div className="container text-right">
                    <small className='mt-3'>
                        Don't have an account? <Link to='/register'>Sign Up</Link>
                    </small>
                    <br/>
                    <small className='mt-3'>
                        Forgot your Password? <Link to='/reset-password'>Reset Password</Link>
                    </small>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = state =>({
    //is authenticated?
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {login})(Login);