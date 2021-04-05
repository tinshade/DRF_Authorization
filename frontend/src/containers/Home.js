import React from 'react';
import {Link} from 'react-router-dom';
const Home = () =>{
    return(
        <section>
            <div className="jumbotron jumbotron-fluid bg-white">
                <div className="container text-center">
                    <h1 className="display-4">Welcome To DRF_Autorization!</h1>
                    <p className="lead">This is a production level DRF/React Auth System boilerplate!</p>
                    {/* <h4> You are logged in as {{state.user.first_name}} </h4> */}
                    <div className="container col-sm-12 col-lg-4 col-md-4 px-2 py-3 d-flex justify-content-between">
                        <Link className="btn btn-outline-primary" to="/login">Login</Link>
                        <Link className="btn btn-primary" to="/register">Register</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;