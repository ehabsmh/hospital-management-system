import Modal from "../../../ui/Modal";
import { MdEdit } from "react-icons/md";
import AddPatient from "../../../components/reservations/AddPatient";
import useDeleteReservation from "../../../components/reservations/useDeleteReservation";
import IDoctorReservation from "../../../interfaces/DoctorReservation";

function DoctorReservation({
  reservation,
}: {
  reservation: IDoctorReservation;
}) {
  const { delReservation } = useDeleteReservation();
  return (
    <>
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

      <td className="p-3 w-24 border border-gray-300">
        <div className="flex justify-center items-center gap-5">
          <p
            className="text-red-800 cursor-pointer"
            onClick={() => delReservation(reservation._id)}
          >
            &#x2718;
          </p>
          <Modal>
            <Modal.Open opens="edit-patient">
              <MdEdit className="text-yellow-800 cursor-pointer" />
            </Modal.Open>
            <Modal.Window name="edit-patient">
              <AddPatient
                patientToEdit={reservation.patientId}
                phoneNumber={reservation.patientId.phoneNumber}
              />
            </Modal.Window>
          </Modal>
        </div>
      </td>
    </>
  );
}

export default DoctorReservation;
