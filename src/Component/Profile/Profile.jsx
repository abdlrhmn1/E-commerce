import jwtDecode from 'jwt-decode'
import React from 'react'

export default function Profile() {
  
    let encodedToken=localStorage.getItem('token')
    let decodedToken=jwtDecode(encodedToken)
    
    
    return <>
        <h1>Hello :{ decodedToken.name}</h1>
        
  
  </>
}

 