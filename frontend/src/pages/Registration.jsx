import Input from "../components/Input.jsx" 
import Button from "../components/Button.jsx"
import {useForm} from "react-hook-form"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Registration() {
  const {register, handleSubmit} = useForm()
  const navigate = useNavigate();
 
  const Register = async(data)=>{
    try {
      console.log(data);
      await axios.post('api/registeruser',{
        avatar : data.avatar[0],
        firstname : data.firstname, 
        lastname : data.lastname, 
        phoneNumber : data.phoneNumber, 
        birthdate : data.birthdate, 
        password : data.password, 
      }, {
        headers: {
          'Content-Type': 'multipart/form-data' // Important to set the content type
        }
      })
      .then((response)=>{ console.log(response);
        console.log(response.status);
        if (response.status = 200 ) {
          navigate('/Login')
        } 
      })
  
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
    
<form onSubmit={handleSubmit(Register)}>

<Input label="avatar: " type="file" placeholder="Enter your firstName"
{...register("avatar", {required: true,})}/>

<Input label="firstname: " type="text" placeholder="Enter your firstname"
{...register("firstname", {required: true,})}/>

<Input label="lastname: " type="text" placeholder="Enter your lastname"
{...register("lastname", {required: true,})}/>

<Input label="phoneNumber: " type="number" placeholder="Enter your phoneNumber"
{...register("phoneNumber", {required: true,})}/>

<Input label="birthdate: " type="date" placeholder="Enter your birthdate"
{...register("birthdate", {required: true,})}/>

<Input label="password: " type="text" placeholder="Enter your password"
{...register("password", {required: true,})}/>

<Button  type="submit"  className="w-full "  >Register</Button> 
</form>
    </div>
  )
}

export default Registration
