import React from 'react'

function Button({
    childern,
    type= "button",
    bgColor = "bg-blue-600",
    textColor ="text-white",
    className = "",
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg  mt-8 my-24 ${bgColor} ${textColor} ${className}`} {...props} >

    </button>
  )
}

export default Button
