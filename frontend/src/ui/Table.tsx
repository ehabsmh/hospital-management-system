import { createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/User";

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
    <thead className="dark:bg-gray-500 bg-gray-200 ">
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

function Row({
  children,
  doctor,
  onClick,
}: {
  children: ReactNode;
  doctor?: IUser;
  onClick?: () => void;
}) {
  const navigate = useNavigate();

  function goToDoctorReservations() {
    navigate(
      `/doctor?id=${doctor?._id}&name=${encodeURIComponent(doctor!.fullName)}`
    );
  }

  return (
    <TableContext.Provider value={{ doctor }}>
      {!doctor ? (
        <tr
          onClick={onClick}
          className={`${
            !onClick
              ? ""
              : "dark:text-white cursor-pointer hover:bg-primary/15 duration-150"
          }`}
        >
          {children}
        </tr>
      ) : (
        <tr
          className={
            "dark:text-white cursor-pointer hover:bg-primary/15 duration-150"
          }
          onClick={doctor ? goToDoctorReservations : undefined}
        >
          {children}
        </tr>
      )}
    </TableContext.Provider>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Columns = Columns;

export default TableContext;
