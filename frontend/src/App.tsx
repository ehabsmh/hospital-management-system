import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/auth/Login";
import { useAuth } from "./components/auth/useAuth";
import Main from "./ui/Main";
import CurrentShift from "./pages/users/current-shift/CurrentShift";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DoctorReservations from "./pages/users/reservations/DoctorReservations";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return null;

  const queryClient = new QueryClient();

  return (
    <>
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
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <ProtectedRoute>
                  <CurrentShift />
                </ProtectedRoute>
              }
            />
            <Route path="schedule" element={<p>schedule</p>} />
          </Route>
          <Route
            path="/doctor"
            element={
              <ProtectedRoute>
                <DoctorReservations />
              </ProtectedRoute>
            }
          />
        </Routes>
      </QueryClientProvider>
      <Toaster />
    </>
  );
}

export default App;
