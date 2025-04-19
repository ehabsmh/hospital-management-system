import { Button } from "@headlessui/react";
import { useAuth } from "../../components/auth/useAuth";
import Reservations from "../../components/users/reservations/Reservations";
import { logout } from "../../services/apiAuth";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useEffect, useState } from "react";

function DoctorDashboard() {
  const { user, setUser } = useAuth();
  const [isOnDarkMode, setIsOnDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  async function onLogout() {
    await logout();
    setUser(null);
  }

  useEffect(
    function () {
      if (isOnDarkMode) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    },
    [isOnDarkMode]
  );

  return (
    <>
      <Reservations
        doctorId={user?._id as string}
        doctorName={user?.fullName as string}
      />
      <div
        className="absolute bottom-3 right-3 bg-gray-700 rounded-full p-2 cursor-pointer"
        onClick={() => {
          localStorage.setItem("darkMode", String(!isOnDarkMode));
          setIsOnDarkMode((prev) => !prev);
        }}
      >
        {isOnDarkMode ? (
          <MdLightMode size={30} color="yellow" />
        ) : (
          <MdDarkMode size={30} color="white" />
        )}
      </div>

      <div className="w-full max-w-md px-1 absolute bottom-0 left-1/2">
        <Button
          onClick={onLogout}
          className="mt-3 rounded-lg border-none py-3 px-7 text-sm/6 text-white bg-primary duration-300  data-[hover]:bg-sky-600 cursor-pointer data-[active]:bg-sky-700"
        >
          Logout
        </Button>
      </div>
    </>
  );
}

export default DoctorDashboard;
