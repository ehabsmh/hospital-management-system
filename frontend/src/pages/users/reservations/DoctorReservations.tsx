import { useNavigate, useSearchParams } from "react-router-dom";
// import { Table } from "../../../components/current-shift/Table";
// import Loader from "../../../ui/Loader";
// import useDoctorReservations from "../../../components/reservations/useDoctorReservations";
// import AddCheck from "../../../components/reservations/AddCheck";
import useCurrentDoctors from "../../../hooks/useCurrentDoctors";
import { useEffect } from "react";
// import DoctorReservation from "../../../components/reservations/DoctorReservation";
import Reservations from "../../../components/users/reservations/Reservations";

// const doctorReservationsCols = [
//   "Name",
//   "Age",
//   "Job",
//   "Phone Number",
//   "Reservation",
//   "",
// ];

function DoctorReservations() {
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("id");
  const doctorName = searchParams.get("name");

  // If doctor not in the current shift navigate to home page

  const navigate = useNavigate();
  const { currentShift } = useCurrentDoctors();
  useEffect(
    function () {
      if (currentShift) {
        const isInCurrShift = currentShift.doctors.some(
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
    <Reservations
      doctorId={doctorId}
      doctorName={doctorName}
      showAddCheck={true}
    />
  );
}

export default DoctorReservations;
