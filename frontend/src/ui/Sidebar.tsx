import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="bg-primary">
      <ul className="mt-10 flex flex-col items-center gap-10 text-white">
        <li>
          <img src="/images/logo.webp" alt="logo" className="w-44" />
        </li>
        <li>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              (isActive ? "font-bold text-lg" : "font-normal text-sm") +
              " duration-150"
            }
          >
            Current Shift
          </NavLink>
        </li>
        <li>
          <NavLink
            to="schedule"
            className={({ isActive }) =>
              (isActive ? "font-bold text-lg" : "font-normal text-sm") +
              " duration-150"
            }
          >
            Schedule
          </NavLink>
        </li>
        <li>
          <NavLink
            to="accounts&clinics"
            className={({ isActive }) =>
              (isActive ? "font-bold text-lg" : "font-normal text-sm") +
              " duration-150"
            }
          >
            <p>Accounts & Clinics</p>
          </NavLink>
        </li>
        <li>
          <NavLink>
            <p>Settings</p>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
