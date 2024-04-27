import React from 'react'
import LogoutBtn from "./LogoutBtn.jsx"
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

function Navbar() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/Home",
      active: authStatus
    }, 
    {
      name: "Login",
      slug: "/Login",
      active: !authStatus,
  },
  {
      name: "RegisterUser",
      slug: "/Registration",
      active: !authStatus,
  },
  {
      name: "UpdateProfile",
      slug: "/UpdateProfile",
      active: authStatus,
  },
  {
    name: "All-Users",
    slug: "/All-Users",
    active: authStatus,
  },
  ]


  return (
    <header>
        <div className=' bg-blue-600 p-3 '>
          <ul className=' flex justify-evenly '>
            { navItems.map( (item)=> item.active ?(
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='hover:bg-blue-300 text-white font-bold rounded-full hover:text-black md:py-2 md:px-2 py-1 px-1'
                >{item.name}</button>
              </li>
            ) : null)}
            {authStatus && (
              <li>
               <LogoutBtn/>
              </li>
            )}
          </ul>

        </div>
    </header>
  )
}

export default Navbar