import { Navigate } from "react-router-dom";
import { useAuth } from "./auth/useAuth";
import { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (user) return children;
  return <Navigate to="/" />;
}

export default ProtectedRoute;
