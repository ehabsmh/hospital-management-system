import { createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../interfaces/User";
import { useAuth } from "../auth/useAuth";

const TableContext = createContext<{ doctor?: IUser } | null>(null);

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 text-center">
        {children}
      </table>
    </div>
  );
}

function Header({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-gray-200 ">
      <tr>{children}</tr>
    </thead>
  );
}

function Columns({ headers }: { headers: string[] }) {
  return (
    <>
      {headers.map((header, index) => (
        <th key={index} className="p-3 border border-gray-300">
          {header}
        </th>
      ))}
    </>
  );
}

function Body({ render }: { render: () => ReactNode }) {
  return <tbody>{render()}</tbody>;
}

function Row({ children, doctor }: { children: ReactNode; doctor?: IUser }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  function goToDoctorReservations() {
    navigate(
      `/doctor?id=${doctor?._id}&name=${encodeURIComponent(doctor!.fullName)}`
    );
  }

  // if (!doctor) return <tr>{children}</tr>;

  if (user?.role === "doctor") {
    return (
      <TableContext.Provider value={{ doctor }}>
        {children}
      </TableContext.Provider>
    );
  }

  return (
    <TableContext.Provider value={{ doctor }}>
      <tr
        className={"cursor-pointer hover:bg-primary/15 duration-150"}
        onClick={doctor ? goToDoctorReservations : undefined}
      >
        {children}
      </tr>
    </TableContext.Provider>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Columns = Columns;

export default TableContext;
