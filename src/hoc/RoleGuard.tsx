import type { PropsWithChildren } from "react";
import type { ROLES } from "../types/Roles";
import useCanView from "../hooks/useCanView";
import { Navigate } from "react-router-dom";

interface RoleGuardProps extends PropsWithChildren {
  allowed: ROLES[];
  isRouterGuard?: boolean;
}

export const RoleGuard = ({ allowed, children, isRouterGuard = false }: RoleGuardProps) => {
  const { isAllowed } = useCanView(allowed);

  return isAllowed ? children : isRouterGuard ? <Navigate to={"/unauthorized"} />: null;
};

export default RoleGuard;
