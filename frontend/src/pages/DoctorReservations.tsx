import { useParams } from "react-router-dom";
import Table from "./users/current-shift/Table";
import Loader from "../ui/Loader";
import useDoctorReservations from "../hooks/useDoctorReservations";
import IDoctorReservation from "../interfaces/DoctorReservation";

function DoctorReservations() {
  const { id } = useParams();
  const { isLoading, doctorReservations, error } = useDoctorReservations(id!);

  const docReservations: IDoctorReservation[] = doctorReservations;

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
        <Table>
          <Table.Header>
            <th className="p-3 border border-gray-300">Name</th>
            <th className="p-3 border border-gray-300">Age</th>
            <th className="p-3 border border-gray-300">Job</th>
            <th className="p-3 border border-gray-300">Phone Number</th>
            <th className="p-3 border border-gray-300">Reservation</th>
            <th className="p-3 border border-gray-300"></th>
          </Table.Header>
          <Table.Body
            render={() =>
              docReservations.map((reservation) => (
                <Table.Row key={reservation._id}>
                  <td className="p-3 border border-gray-300">
                    {reservation.patientId.fullName.split(" ")[0]}{" "}
                    {reservation.patientId.fullName.split(" ")[3]}
                  </td>

                  <td className="p-3 border border-gray-300">
                    {reservation.patientId.age}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {reservation.patientId.job}
                  </td>
                  <td className="p-3 border border-gray-300 text-center">
                    {reservation.patientId.phoneNumber}
                  </td>
                  <td className="p-3 border border-gray-300 text-center">
                    {reservation.reservationTypeId.name}
                  </td>

                  <td className="p-3 w-32">
                    <div className=" flex justify-center items-center gap-5">
                      <p>❌</p>
                      <p>🚼</p>
                    </div>
                  </td>
                </Table.Row>
              ))
            }
          />
        </Table>
      )}
    </>
  );
}

export default DoctorReservations;
