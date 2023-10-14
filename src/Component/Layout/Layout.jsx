import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import { UserContext } from '../userContext/userContext';
import { Offline, Online } from "react-detect-offline";
const Layout = () => {

    let { setToken } = useContext(UserContext)

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setToken(localStorage.getItem('token'))
        }
    }, [])



    return (
        <>
            <Navbar />
            <div className='my-5 py-1'></div>
            <div className="container">
                <Outlet />
            </div>
            {/* <Footer/>    */}

            <div>
                <Offline>
                    <div className="network"><i className='fas fa-wifi me-4'></i>
                        You're Offline
                    </div>
                </Offline>
            </div>
        </>
    );
}

export default Layout;
