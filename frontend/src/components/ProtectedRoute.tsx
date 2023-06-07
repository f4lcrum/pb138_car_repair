import { Navigate, Outlet, useLocation } from "react-router-dom";
import { FC } from "react";
import { useAuth } from "../hooks/useAuth.ts";

const ProtectedRoute: FC = () => {
  const location = useLocation();
  const { data, isLoading } = useAuth();

  return (
    <>
      {!isLoading &&
        (data?.item.role ? (
          <Outlet />
        ) : (
          <Navigate to="/login" state={{ from: location }} />
        ))}
    </>
  );
};

export default ProtectedRoute;
