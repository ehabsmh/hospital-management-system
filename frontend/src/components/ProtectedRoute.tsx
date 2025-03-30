import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Login from "../pages/auth/Login";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (user) return children;
  return Navigate({ to: "/login" });
}

export default ProtectedRoute;
