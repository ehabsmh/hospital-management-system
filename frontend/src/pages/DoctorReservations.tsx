import { useNavigate, useSearchParams } from "react-router-dom";
import Table from "./users/current-shift/Table";
import Loader from "../ui/Loader";
import useDoctorReservations from "../hooks/useDoctorReservations";
import IDoctorReservation from "../interfaces/DoctorReservation";
import AddCheck from "../components/users/reservations/AddCheck";
import useCurrentDoctors from "../hooks/useCurrentDoctors";
import ICurrentShift from "../interfaces/CurrentShift";
import { useEffect } from "react";

const doctorReservationsCols = [
  "Name",
  "Age",
  "Job",
  "Phone Number",
  "Reservation",
  "",
];

function DoctorReservations() {
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("id");
  const doctorName = searchParams.get("name");
  const navigate = useNavigate();

  const { isLoading, doctorReservations, error } = useDoctorReservations(
    doctorId!
  );

  const docReservations: IDoctorReservation[] = doctorReservations;

  const { currentShift } = useCurrentDoctors();

  if (currentShift) {
    const isInCurrShift = currentShift.doctors.find(
      (doctor) => doctor._id === doctorId
    );

    if (!isInCurrShift) navigate("/");
  }

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
                      <div className="flex justify-center items-center gap-5">
                        <p>❌</p>
                        <p>🚼</p>
                      </div>
                    </td>
                  </Table.Row>
                ))
              }
            />
          </Table>
          <AddCheck />
        </>
      )}
    </>
  );
}

export default DoctorReservations;
