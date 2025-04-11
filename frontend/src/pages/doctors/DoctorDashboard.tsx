import { Button } from "@headlessui/react";
import { useAuth } from "../../components/auth/useAuth";
import Reservations from "../../components/reservations/Reservations";
import { logout } from "../../services/apiAuth";

function DoctorDashboard() {
  const { user, setUser } = useAuth();

  async function onLogout() {
    await logout();
    setUser(null);
  }

  return (
    <>
      <Reservations
        doctorId={user?._id as string}
        doctorName={user?.fullName as string}
      />
      <div className="w-full max-w-md px-1">
        <Button
          onClick={onLogout}
          className="mt-3 absolute bottom-0 rounded-lg border-none py-1.5 px-3 text-sm/6 text-white bg-primary duration-300  data-[hover]:bg-sky-600 cursor-pointer data-[active]:bg-sky-700"
        >
          Logout
        </Button>
      </div>
    </>
  );
}

export default DoctorDashboard;
