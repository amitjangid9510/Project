import React from 'react'
import Button from '../Utils/Button.jsx'
import Input from '../Utils/Input.jsx'
import {useForm} from 'react-hook-form'


function UpdateProfile() {
  const {register, handleSubmit} = useForm()
  return (
    <div className="  bg-slate-300 flex h-screen justify-center items-center ">
   <div className=" bg-white bg-opacity-50 max-w-sm p-4">
        
        <div>
        <div className=' font-bold pb-3 '>Change Profile Picture</div>
        <form onSubmit={handleSubmit()}>
                    <div className='space-y-5'>
                        <Input
                        label="Choose Avatar: "
                        placeholder="Choose Image"
                        type="file"
                        {...register("avatar", {
                            required: true,
                        })}
                        />
                       
                        <Button type="submit" className="w-full">
                            Upload Photo
                        </Button>
                    </div>
                </form>
        </div>
        
      </div>
    </div>
  )
}

export default UpdateProfile
