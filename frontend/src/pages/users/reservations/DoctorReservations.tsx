import { useNavigate, useSearchParams } from "react-router-dom";
import { Table } from "../../../components/current-shift/Table";
import Loader from "../../../ui/Loader";
import useDoctorReservations from "../../../components/reservations/useDoctorReservations";
import AddCheck from "../../../components/reservations/AddCheck";
import useCurrentDoctors from "../../../hooks/useCurrentDoctors";
import { useEffect } from "react";
import DoctorReservation from "../../../components/reservations/DoctorReservation";

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
  const { currentShift } = useCurrentDoctors();

  const docReservations = doctorReservations;

  useEffect(
    function () {
      if (currentShift) {
        const isInCurrShift = currentShift.doctors.find(
          (doctor) => doctor._id === doctorId
        );

        if (!isInCurrShift) {
          navigate("/");
        }
      }
    },
    [currentShift, doctorId, navigate]
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
                docReservations?.map((reservation) => (
                  <Table.Row key={reservation._id}>
                    <DoctorReservation reservation={reservation} />
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
