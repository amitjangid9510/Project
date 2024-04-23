import React from 'react'
import Button from '../Utils/Button.jsx'
import Input from '../Utils/Input.jsx'
import {useForm} from 'react-hook-form'
import { useMutation } from 'react-query';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom'
import  {logout}  from '../store/auth.sclice.js';
import { login } from '../store/auth.sclice.js';
import { useDispatch } from 'react-redux'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loginUser = async (data) => {
    try {
    const response = await axios.post('https://amit-plum.vercel.app/user/login', {phoneNumber: data.phoneNumber, password : data.password});
    if (response.status = 200) {
      console.log(response);
      dispatch(login(response.data))
      navigate("/Home")
    }else{
      dispatch(logout())
      navigate("/Login")
    }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
    
const { register, handleSubmit, errors } = useForm();
const { mutate, isLoading, isError, error } = useMutation(loginUser);
const onSubmit = (data) => {mutate(data);};

  return (
<div className="  bg-slate-300 flex h-screen justify-center items-center ">
<div className=" bg-white bg-opacity-50 max-w-sm p-4 rounded-md shadow-lg">
<div className=' font-bold pb-3 '> User Login </div>
<form onSubmit={handleSubmit(onSubmit)}>
<div className='space-y-5'>
<Input label="Phone Number: " placeholder="Enter your Phone Number"{...register("phoneNumber", {required: true,})}/>
<Input label="Password: " type="password" placeholder="Enter your password" {...register("password", { required: true,})}/>
{isError && <p>{error.message}</p>}
<Button type="submit" disabled={isLoading} className="w-full">{isLoading ? 'Logging in...' : 'Login'}</Button>

</div>
</form>
</div>
</div>
  )
}

export default Login
