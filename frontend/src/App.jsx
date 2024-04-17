import { Outlet } from 'react-router-dom'
import Header from "../src/components/header/Header.jsx"
import { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  const getUser = async()=>{
    navigate('/login')
  }

  useEffect(()=>{
    getUser()
  } ,[])

  return (
    <>
        <Header />
        <Outlet />
        
    </>
  )
}

export default App
