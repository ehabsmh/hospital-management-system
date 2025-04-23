import { MdDarkMode, MdLightMode, MdLogout } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/apiAuth";
import { useAuth } from "../components/auth/useAuth";
import { useEffect, useState } from "react";

function Sidebar() {
  const { setUser, user } = useAuth();
  const navigate = useNavigate();
  const [isOnDarkMode, setIsOnDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  async function onLogout() {
    await logout();
    setUser(null);
    navigate("/");
  }

  useEffect(
    function () {
      if (isOnDarkMode) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    },
    [isOnDarkMode]
  );
  return (
    <aside className="dark:bg-primary-darker bg-primary flex flex-col items-center py-16 h-screen">
      <ul className="flex flex-col items-center gap-10 text-white">
        <li>
          <img src="/images/logo.webp" alt="logo" className="w-44" />
        </li>
        <li>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              (isActive ? "font-bold" : "font-normal") + " duration-150"
            }
          >
            Current Shift
          </NavLink>
        </li>
        <li>
          <NavLink
            to="schedule"
            className={({ isActive }) =>
              (isActive ? "font-bold" : "font-normal") + " duration-150"
            }
          >
            Schedule
          </NavLink>
        </li>
        {user?.role === "admin" && (
          <li>
            <NavLink
              to="accounts&clinics"
              className={({ isActive }) =>
                (isActive ? "font-bold" : "font-normal") + " duration-150"
              }
            >
              <p>Accounts & Clinics</p>
            </NavLink>
          </li>
        )}
        <li>
          <p>Settings</p>
        </li>
      </ul>

      <ul className="mt-auto text-white mb-4 flex gap-5">
        <MdLogout size={30} className="cursor-pointer" onClick={onLogout} />
        {isOnDarkMode ? (
          <MdLightMode
            size={30}
            className="cursor-pointer"
            color="yellow"
            onClick={() => {
              localStorage.setItem("darkMode", String(false));
              setIsOnDarkMode(!isOnDarkMode);
            }}
          />
        ) : (
          <MdDarkMode
            size={30}
            color="white"
            className="cursor-pointer text-zinc-800"
            onClick={() => {
              localStorage.setItem("darkMode", String(true));
              setIsOnDarkMode(!isOnDarkMode);
            }}
          />
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
