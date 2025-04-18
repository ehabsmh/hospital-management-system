import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../components/auth/useAuth";
import DoctorDashboard from "../pages/doctors/DoctorDashboard";

function Main() {
  const { user } = useAuth();

  if (user?.role === "doctor") {
    return (
      <main className="h-screen relative">
        <DoctorDashboard />
      </main>
    );
  }
  return (
    <main className="h-screen grid grid-cols-[minmax(100px,auto)_1fr] md:grid-cols-[minmax(200px,auto)_1fr]">
      <Sidebar />
      <Outlet />
    </main>
  );
}

export default Main;
