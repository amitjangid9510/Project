import React from 'react'
import axios from 'axios';


function Home() {

    const logoutHandler = async() => { 
      try {
        const response = axios.post('https://amit-plum.vercel.app/user/getpost')
        console.log(response);
      
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <button
    className=' px-6 py-2 font-bold border text-white duration-200 hover:bg-blue-100  hover:text-black rounded-sm'
    onClick={logoutHandler}
    >button</button>
  )
}

export default Home
