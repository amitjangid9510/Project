import Input from "../components/Input.jsx" 
import Button from "../components/Button.jsx"
import {useForm} from "react-hook-form"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { login } from "../store/authSclice.js";

function Login() {
  const {register, handleSubmit} = useForm()
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [err , seterr]=useState()

  
  const displayError = ()=>{
    seterr(<h1 >wrong password</h1>) 
  }

  const loginUser = async(data)=>{
    try {
      console.log(data);
      await axios.post('/api/login',{
        email: data.email, 
        password: data.password})
      .then((response)=>{ console.log(response);
        console.log(response.data.data.user);
        if (response.status = 200 ) {
          dispatch(login(response.data.data.user))
          navigate('/Home')
        } 
       
      })
  
    } catch (error) {
      console.log(error);
      navigate("/Login")
      displayError()
    }
  
  }
  return (
    <div>
      <form onSubmit={handleSubmit(loginUser)}>
             <Input label="Email: " placeholder="Enter your email" type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
              <Input label="Password: " type="password" placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button  type="submit"  className="w-full"  >Log in</Button>
        </form>
        <p> email = "amitjangid9510@gmail.com" ;</p>
        <p>username = "amit_2712";</p>
        <p>password = "amitamit";</p>

        <div className=" from-orange-500">
        {err}
        </div>
    </div>
    
  )
}

export default Login




      