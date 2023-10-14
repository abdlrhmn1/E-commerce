import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


export default function ProtectedRoute (props)  {
    let navigate=useNavigate()

        if(localStorage.getItem('token')!==null){
            return props.children
        }
        else{
            return <Navigate to={'/login'}/>

           
        }
    
}