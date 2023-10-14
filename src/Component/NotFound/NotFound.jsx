import React from 'react';
import img from '../../Assets/images/error.svg'
const NotFound = () => {
    return (
        <div className=' m-auto text-center w-100 d-flex align-items-center flex-column justify-content-center'>
            <br /><br /><br />
            <img src={img} alt="" />
            <h1 className=' fw-bold'>Page Not Found </h1>
        </div>
    );
}

export default NotFound;
