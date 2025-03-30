import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { IUser } from "../interfaces/User";

type ValueType = {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  loading: boolean;
};

// Create Auth Context
const AuthContext = createContext<ValueType | null>(null);

// Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data on mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/auth/me", { withCredentials: true }) // withCredentials allows cookies
      .then(({ data }) => setUser(data))
      .catch(() => setUser(null)) // Handle unauthenticated state
      .finally(() => setLoading(false));
  }, []);

  const value: ValueType = {
    user,
    setUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
