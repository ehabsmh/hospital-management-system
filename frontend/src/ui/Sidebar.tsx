import { MdLogout } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { logout } from "../services/apiAuth";
import { useAuth } from "../components/auth/useAuth";

function Sidebar() {
  const { setUser, user } = useAuth();
  async function onLogout() {
    await logout();
    setUser(null);
  }
  return (
    <aside className="bg-primary flex flex-col items-center py-16 h-screen">
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

      <ul className="mt-auto text-white mb-4">
        <MdLogout size={30} className="cursor-pointer" onClick={onLogout} />
      </ul>
    </aside>
  );
}

export default Sidebar;
