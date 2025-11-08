import { use } from "react";

import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";

const PrivateRoute = ({ children }) => {
  
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;