import { MdDarkMode, MdLightMode, MdLogout } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { logout } from "../services/apiAuth";
import { useAuth } from "../components/auth/useAuth";
import { useState } from "react";

function Sidebar() {
  const { setUser, user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  async function onLogout() {
    await logout();
    setUser(null);
  }
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
        {isDarkMode ? (
          <MdLightMode
            size={30}
            className="cursor-pointer"
            onClick={() => {
              document.documentElement.classList.remove("dark");
              setIsDarkMode(!isDarkMode);
            }}
          />
        ) : (
          <MdDarkMode
            size={30}
            className="cursor-pointer text-zinc-800"
            onClick={() => {
              document.documentElement.classList.add("dark");
              setIsDarkMode(!isDarkMode);
            }}
          />
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
