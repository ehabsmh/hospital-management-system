import Loader from "../../ui/Loader";
import { Table } from "../current-shift/Table";
import AddCheck from "./AddCheck";
import DoctorReservation from "./DoctorReservation";
import useDoctorReservations from "./useDoctorReservations";

const doctorReservationsCols = [
  "Name",
  "Age",
  "Job",
  "Phone Number",
  "Reservation",
  "",
];

type ReservationsProps = {
  doctorId: string | null;
  doctorName: string | null;
  showAddCheck?: boolean;
};
function Reservations({
  doctorId,
  doctorName,
  showAddCheck = false,
}: ReservationsProps) {
  const { isLoading, doctorReservations, error } = useDoctorReservations(
    doctorId!
  );

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center">
          <Loader size={30} color={"#23B1F8"} />
        </div>
      )}
      {!isLoading && error && (
        <div className="h-screen flex justify-center items-center">
          <p className="text-red-500">{error.message}</p>
        </div>
      )}
      {!isLoading && !error && (
        <>
          <div className="bg-primary text-white font-bold text-center p-3">
            <h2>
              Dr. {doctorName?.split(" ")[0]} {doctorName?.split(" ")[3]}
            </h2>
          </div>
          <Table>
            <Table.Header>
              <Table.Columns headers={doctorReservationsCols} />
            </Table.Header>
            <Table.Body
              render={() =>
                doctorReservations?.map((reservation) => (
                  <Table.Row key={reservation._id}>
                    <DoctorReservation reservation={reservation} />
                  </Table.Row>
                ))
              }
            />
          </Table>
          {showAddCheck && <AddCheck />}
        </>
      )}
    </>
  );
}

export default Reservations;
