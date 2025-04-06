import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Main() {
  return (
    <main className="h-screen grid grid-cols-[minmax(250px,auto)_1fr]">
      <Sidebar />
      <Outlet />
    </main>
  );
}

export default Main;
