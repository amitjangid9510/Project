import {useSelector} from 'react-redux'

const AuthLayout = ({ children }) => {

  const isAuthenticated = useSelector((state) => state.auth.status)

  return isAuthenticated ? children : <div className="h-screen bg-slate-300 p-6 "></div>
};

export default AuthLayout;
