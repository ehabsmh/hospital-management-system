import { createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../interfaces/User";

const TableContext = createContext(null);

// function Table({ currShiftDoctors }: { currShiftDoctors: ICurrentShift }) {
//   console.log(currShiftDoctors);

//   return (
//     <div className="w-full overflow-x-auto">
//       <table className="w-full border-collapse border border-gray-300 text-center">
//         <TableHead />
//         <tbody>
//           {currShiftDoctors.doctors.map((doctor) => (
//             <TableRow key={doctor._id} doctor={doctor} />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// const doctorColumns = [
//   { key: "avatar", label: "Avatar" },
//   { key: "doctorName", label: "Doctor" },
//   { key: "patientsHandled", label: "Patients Handled" },
//   { key: "rank", label: "Rank" },
//   { key: "clinic", label: "Clinic" },
//   { key: "status", label: "Status" },
// ];

// const doctorReservationsColumns = [
//   { key: "name", label: "Name" },
//   { key: "age", label: "Age" },
//   { key: "job", label: "Job" },
//   { key: "phoneNumber", label: "Phone Number" },
//   { key: "reservation", label: "Reservation" },
//   { key: "edit/cancel", label: "" },
// ];

function Table({ children }: { children: ReactNode }) {
  return (
    <TableContext.Provider>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-center">
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-gray-200">
      <tr>{children}</tr>
    </thead>
  );
}

function Body({ render }: { render: () => ReactNode }) {
  return <tbody>{render()}</tbody>;
}

function Row({ children, doctor }: { children: ReactNode; doctor?: IUser }) {
  const navigate = useNavigate();

  function goToDoctorReservations() {
    navigate(`/doctor/${doctor?._id}`);
  }

  if (!doctor) return <tr>{children}</tr>;

  return (
    <tr className="cursor-pointer" onClick={goToDoctorReservations}>
      {children}
    </tr>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

/*

<TableHead />
        <tbody>
          {currShiftDoctors.doctors.map((doctor) => (
            <TableRow key={doctor._id} doctor={doctor} />
          ))}
        </tbody>
*/
export default Table;
