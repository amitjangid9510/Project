
import Container from 'postcss/lib/container'
import React from 'react'
import { useNavigate } from 'react-router-dom'


function Header() {
  const authStatus = false //useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/Home",
      active: authStatus
    }, 
    {
      name: 'Register User',
      slug: "/Registration",
      active: !authStatus
    },
    {
      name: "Login",
      slug: "/Login",
      active: !authStatus,
  },
  {
    name: "Update info",
    slug: "/Update-info",
    active: authStatus,
},
  {
      name: "Public",
      slug: "/user-Info",
      active: authStatus,
  },{
    name: "Logout",
    slug: "/Logout",
    active: authStatus,
},
  

  ]

  return (
    <>
    <ul className='flex bg-slate-600 text-color-white ' >
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name} className="text-white">
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            
          </ul>
    
    </>
  )
}

export default Header

