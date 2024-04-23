import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from "./Header/Navbar.jsx"
import Footer from "./Footer/Footer.jsx"
import axios from 'axios';
import { useDispatch } from 'react-redux'
import  {logout}  from './store/auth.sclice.js';
import { login } from './store/auth.sclice.js';

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getUser = async()=>{
    try {
      const response = await axios.post('https://amit-plum.vercel.app/user/getuser')
      
      if (response.status = 200) {
        console.log(response);
        dispatch(login(response.data.user1))
        navigate("/Home")
      }else{
        dispatch(logout())
        navigate("/Login")
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getUser()
  },[])

  return (
    <div >
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App
