import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import store from "./store/store.js"
import { Provider } from 'react-redux'
import Home from "./pages/Home.jsx"
import Registration from "./pages/Registration.jsx"
import Post_card from "./pages/Post_card.jsx"
import AllUsers from "./pages/AllUsers.jsx"
import Login from "./pages/Login.jsx"
import Logout from "./pages/Logout.jsx"


const router = createBrowserRouter([

  {path : "/" ,
  element :<App/>,
  children:[
    {path : "/Home" ,element :<Home/>},
    {path : "/Login" ,element :<Login/>},
    {path : "/Registration" ,element :<Registration/>},
    {path : "/post_card" ,element :<Post_card/>},
    {path : "/AllUsers" ,element :<AllUsers/>},
    {path : "/Logout" ,element :<Logout/>},
    
  ]
}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
