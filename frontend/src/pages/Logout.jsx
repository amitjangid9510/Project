import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();


    const logout = async()=>{
        try {
            await axios.post('/api/logout')
            .then((response)=>{ console.log(response);
              console.log(response.status);
              if (response.status = 200 ) {
                navigate('/Login')
              } 
             
            })
        
          } catch (error) {
            console.log(error);
            navigate("/Home")
          }
    }

    useEffect(()=>{
        logout()
    } , [])
  return (
    <div>
      
    </div>
  )
}

export default Logout
