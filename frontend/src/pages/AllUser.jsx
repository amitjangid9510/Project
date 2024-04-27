import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Button from '../Utils/Button.jsx'

function AllUser() {

  const[dataa , setdata ]=useState([])
  function addCloudinaryTransformation(url) {
   
    const transformationExists = url.includes('upload/');
    const transformation = transformationExists ? '/w_500,h_500,c_fill' : 'upload/w_500,h_500,c_fill';
    const transformedURL = url.replace(/upload\/?/, `upload/${transformation}/`);
    return transformedURL;
}

  const getPost = async() => { 
    try {
       const response = await axios.post('/api/getAllUser')
        setdata(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }
    useEffect(()=>{
      getPost()

    },[])
    
  return (
    <div>
<div className="min-h-screen bg-slate-300 md:p-6 p-3">
<div className="lg:text-3xl font-bold text-black rounded-md text-2xl m-2 mb-4 md:m-4 md:mb-8">Total User {`(${dataa.length})`} {"  :)"} </div>
    <div className='bg-slate-500 rounded-md shadow-lg p-4 md:p-7'>
    <ul className=" grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {dataa.map((item)=> (<li key={item.phoneNumber}><div className="rounded-xl bg-white shadow-lg">
        <img src={`${addCloudinaryTransformation(item.avatar)}`} alt={`${item.firstname}`} className="mx-auto mb-2 rounded-xl" />
        <div className="m-2 text-center">{item.firstname}{" "}{item.lastname} <Button  className='mt-2 mx-4 px-2 py-1 mb-2' >Add frind</Button> </div>
        
      </div></li>))}
      
    </ul>
    </div>


  </div>

    </div>
  )
}

export default AllUser







