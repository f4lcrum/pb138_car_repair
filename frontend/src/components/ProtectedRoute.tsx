import { Navigate, Outlet } from "react-router-dom";
import { FC } from "react";

// TODO: update when authentication is done on BE

const ProtectedRoute: FC = () => {
  const auth = true;

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
