import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import  {logout}  from '../store/auth.sclice.js';

function LogoutBtn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

    const logoutHandler = async() => { 
      try {
        const response = axios.post('/api/logout')
        console.log(response);
      if (response.status = 200) {
        dispatch(logout())
        navigate("/Login")
      }
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <button
    className=' px-6 py-2 font-bold border text-white duration-200 hover:bg-blue-100  hover:text-black rounded-sm'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn