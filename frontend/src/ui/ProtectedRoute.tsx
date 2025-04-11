import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../components/auth/useAuth";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

  return children;
}

export default ProtectedRoute;
