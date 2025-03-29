import { useContext } from "react";
import AuthContext from "../contexts/Auth";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth were used outside AuthProvider");
  }

  return context;
}
