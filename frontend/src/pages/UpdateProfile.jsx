import React from 'react'
import Button from '../Utils/Button.jsx'
import Input from '../Utils/Input.jsx'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import { useMutation } from 'react-query';


function UpdateProfile() {
  
  const UpdateAvatar = async (data) => {
    try {
    const response = await axios.post('/api/UpdateAvatar', {
      avatar: data.avatar[0],
    },{
      headers: {
        'Content-Type': 'multipart/form-data'
      }});
      console.log(response);
    if (response.status = 200) {
      return response
    }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const {register, handleSubmit} = useForm()
  const { mutate, isLoading, isError, error , data} = useMutation(UpdateAvatar);
  const onSubmit = (data) => {mutate(data);};

  return (
<div className="  bg-slate-300 flex h-screen justify-center items-center ">
<div className=" bg-white bg-opacity-50 max-w-sm p-4">    
<div className=' font-bold pb-3 '>Change Profile Picture</div>
<form onSubmit={handleSubmit(onSubmit)}>
<div className='space-y-5'>
<Input label="Uplod Avatar : " type ="file" {...register("avatar", { required: true, })} />
{isError && <p>{error.message}</p>}{data && (<p className=' font-bold text-green-700 '>Profile Pic Changed successfully !!</p>)}
{isLoading ? <p className=' font-bold text-green-700 '>Wait Uploding...!</p> : null }
<Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Uploding...' : 'Change Profile Pic'}</Button>
</div>
</form>
</div>
</div>
  )
}

export default UpdateProfile
