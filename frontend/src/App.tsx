import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/auth/Login";
import { useAuth } from "./hooks/useAuth";
import Main from "./ui/Main";
import CurrentShift from "./pages/users/current-shift/CurrentShift";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return null;

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
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
        <Route path="/dashboard" element={<Main />}>
          <Route index element={<CurrentShift />} />
          <Route path="schedule" element={<p>schedule</p>} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
