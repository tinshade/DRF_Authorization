import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { logout_user } from '../../actions/auth';

const Navbar = ({ logout_user, isAuthenticated }) =>{

    const commonLinks = () => (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
        </Fragment>
    );

    const authLinks = () =>(
        <span className="navbar-text">
            <a href="#!" className="btn btn-outline-danger" onClick={logout_user}>Logout</a>
        </span>
    );
    return(
        <nav class="navbar navbar-expand-md fixed-top navbar-light" style={{backgroundColor: "#e3f2fd"}}>
            <a className="navbar-brand" href="#">DRF Auth</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    {!isAuthenticated && commonLinks()}
                </ul>
                    {isAuthenticated && authLinks()}
            </div>
            </nav>
    );
}

const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout_user })(Navbar);