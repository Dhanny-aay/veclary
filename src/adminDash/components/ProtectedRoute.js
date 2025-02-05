import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Show a loading screen while checking auth status
  }

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/adminLogin" state={{ from: location }} replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;
