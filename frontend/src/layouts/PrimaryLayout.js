import React from 'react';
import Navbar from '../components/Navbar'

const PrimaryLayout = (props) =>{
    return(
        <>
        <Navbar />
        {props.children}
        </>
    );
}

export default PrimaryLayout;