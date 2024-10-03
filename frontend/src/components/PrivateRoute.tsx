import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  console.log("Private Route")
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;