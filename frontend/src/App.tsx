import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/auth/Login";
import { useAuth } from "./components/auth/useAuth";
import Main from "./ui/Main";
import CurrentShift from "./pages/users/current-shift/CurrentShift";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DoctorReservations from "./pages/users/reservations/DoctorReservations";
import { Toaster } from "sonner";
import ProtectedRoute from "./ui/ProtectedRoute";
import Schedule from "./pages/users/schedule/Schedule";
import Accounts from "./pages/admins/Accounts";
import CreateNewPassword from "./pages/CreateNewPassword";
import Loader from "./ui/Loader";

function App() {
  const { user, loading } = useAuth();

  const location = useLocation();
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader size={50} color="#23B1F8" />;
      </div>
    );
  }

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
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
          {user?.role !== "doctor" ? (
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
              <Route
                path="schedule"
                element={
                  <ProtectedRoute>
                    <Schedule />
                  </ProtectedRoute>
                }
              />
              {user?.role === "admin" && (
                <Route
                  path="accounts&clinics"
                  element={
                    <ProtectedRoute>
                      <Accounts />
                    </ProtectedRoute>
                  }
                />
              )}
            </Route>
          ) : (
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Main />
                </ProtectedRoute>
              }
            />
          )}
          <Route
            path="/doctor"
            element={
              <ProtectedRoute>
                <DoctorReservations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-new-password/:id"
            element={<CreateNewPassword />}
          />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </QueryClientProvider>
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
