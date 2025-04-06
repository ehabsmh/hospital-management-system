import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Main() {
  return (
    <main className="h-screen grid grid-cols-[minmax(320px,auto)_1fr]">
      <Sidebar />
      <Outlet />
    </main>
  );
}

export default Main;
