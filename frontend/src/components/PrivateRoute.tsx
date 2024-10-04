import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  console.log("Private Route")
  const { user } = useAuth();
  console.log(user)
  return user ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;