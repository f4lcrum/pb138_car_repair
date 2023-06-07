import { Role } from "../models/authTypes.ts";
import React, { FC } from "react";
import { useAuth } from "../hooks/useAuth.ts";
import UnauthorizedPage from "../pages/UnauthorizedPage.tsx";

interface AuthorizedRouteProps {
  children?: React.ReactNode;
  roles?: Role[];
}

const AuthorizedRoute: FC<AuthorizedRouteProps> = ({
  children,
  roles = [],
}) => {
  const { data } = useAuth();
  const userHasRequiredRole =
    !!data?.item.role && roles.includes(data?.item.role);

  const technicianVerified =
    data?.item.role != Role.TECHNICIAN || !!data?.item.isVerified;

  if (!userHasRequiredRole && technicianVerified) {
    return <UnauthorizedPage />;
  }

  return <>{children}</>;
};

export default AuthorizedRoute;
