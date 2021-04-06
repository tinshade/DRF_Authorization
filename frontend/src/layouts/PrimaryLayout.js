import React, {useEffect} from 'react';
import Navbar from '../components/Navbar'
import {connect} from 'react-redux';
import {check_authenticated, load_user} from '../actions/auth';
const PrimaryLayout = (props) =>{
    useEffect(()=>{
        props.check_authenticated();
        props.load_user();
    }, []);
    return(
        <>
        <Navbar />
        <section style={{paddingTop: "10%"}} id="main">
            {props.children}
        </section>
        </>
    );
}

export default connect(null, {check_authenticated, load_user})(PrimaryLayout);