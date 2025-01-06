import {
  selectToken,
  selectCurrentRole,
  selectPermissions,
} from "../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { toast } from "sonner";

const ProtectedRoute = ({
  children,
  allowedRoles = [],
  requiredPermissions = [],
}) => {
  const token = useAppSelector(selectToken);
  const userRole = useAppSelector(selectCurrentRole);
  const userPermissions = useAppSelector(selectPermissions);

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  // Check role access
  const hasRoleAccess =
    allowedRoles.length === 0 || allowedRoles.includes(userRole);

  // Check permission access
  const hasPermissionAccess =
    requiredPermissions.length === 0 ||
    requiredPermissions.every((perm) => userPermissions.includes(perm));

  if (!hasRoleAccess && !hasPermissionAccess) {
    toast.error("You do not have the required permissions or role.");
    return <Navigate to={"/dashboard"} />;
  }

  return children;
};

export default ProtectedRoute;
