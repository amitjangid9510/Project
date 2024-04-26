import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Registration from './pages/Registration.jsx'
import UpdateProfile from './pages/UpdateProfile.jsx'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux'
import store from './store/store.js'
import AuthLayout from './pages/AuthLayout.jsx'
import AllUser from './pages/AllUser.jsx'

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {path:"/Home" , element:<AuthLayout><Home /></AuthLayout>},
      {path:"/Login" , element: <Login />},
      {path:"/Registration" , element: <Registration />},
      {path:"/UpdateProfile" , element: <AuthLayout><UpdateProfile /></AuthLayout>},
      {path:"/All-Users" , element: <AuthLayout><AllUser /></AuthLayout>},
      
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
