import { FC } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";
import { Role } from "../models/authTypes.ts";
import NotFoundPage from "./NotFoundPage.tsx";

const HomePage: FC = () => {
  const location = useNavigate();
  const { data } = useAuth();

  switch (data?.item.role) {
    case Role.CLIENT:
      return <Navigate to="/vehicle" state={{ from: location }} />;
    case Role.TECHNICIAN:
      return <Navigate to="/repair" state={{ from: location }} />;
    case Role.ADMIN:
      return <Navigate to="/technician" state={{ from: location }} />;
  }

  return <NotFoundPage />;
};

export default HomePage;
