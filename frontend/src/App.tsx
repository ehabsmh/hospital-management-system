import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/auth/Login";
import { useAuth } from "./hooks/useAuth";
import Dashboard from "./pages/admins/Dashboard";

function App() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to={location.state?.from || "/dashboard"} replace />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
