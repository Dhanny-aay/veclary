import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import DashboardSkeleton from "./DashboardSkeleton";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
