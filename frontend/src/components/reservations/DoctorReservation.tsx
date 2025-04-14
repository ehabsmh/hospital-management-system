import IDoctorReservation from "../../interfaces/DoctorReservation";
import { MdEdit } from "react-icons/md";
import Modal from "../../ui/Modal";
import AddPatient from "./AddPatient";
import useDeleteReservation from "./useDeleteReservation";
import { useAuth } from "../auth/useAuth";
import { FaCheckCircle } from "react-icons/fa";
import CreateCaseRecord from "../case-records/CreateCaseRecord";

type DoctorReservationProps = {
  reservation: IDoctorReservation;
  onClick?: () => void;
};

function DoctorReservation({ reservation, onClick }: DoctorReservationProps) {
  const { delReservation } = useDeleteReservation();
  const { user } = useAuth();

  return (
    <tr
      onClick={onClick}
      className={"cursor-pointer hover:bg-primary/15 duration-150"}
    >
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
          {user?.role !== "doctor" && (
            <p
              className="text-red-800 cursor-pointer"
              onClick={() => delReservation(reservation._id)}
            >
              &#x2718;
            </p>
          )}
          <Modal>
            {user?.role !== "doctor" && (
              <>
                <Modal.Open opens="edit-patient">
                  <MdEdit className="text-yellow-800 cursor-pointer" />
                </Modal.Open>
                <Modal.Window name="edit-patient">
                  <AddPatient
                    patientToEdit={reservation.patientId}
                    phoneNumber={reservation.patientId.phoneNumber}
                  />
                </Modal.Window>
              </>
            )}
            {user?.role === "doctor" && (
              <>
                <Modal.Open opens="complete-patient-check">
                  <FaCheckCircle
                    className="text-green-400 hover:text-green-600 duration-150 cursor-pointer"
                    size={20}
                  />
                </Modal.Open>
                <Modal.Window name="complete-patient-check">
                  <CreateCaseRecord
                    patientId={reservation.patientId._id}
                    reservationId={reservation._id}
                  />
                </Modal.Window>
              </>
            )}
          </Modal>
        </div>
      </td>
    </tr>
  );
}

export default DoctorReservation;
