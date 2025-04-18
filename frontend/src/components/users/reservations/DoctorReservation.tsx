import IDoctorReservation from "../../../interfaces/DoctorReservation";
import { MdEdit, MdOutlineCancel } from "react-icons/md";
import Modal from "../../../ui/Modal";
import AddPatient from "./AddPatient";
import useDeleteReservation from "./useDeleteReservation";
import { useAuth } from "../../auth/useAuth";
import { FaCheckCircle } from "react-icons/fa";
import CreateCaseRecord from "../../doctors/case-records/CreateCaseRecord";
import { toast } from "sonner";

type DoctorReservationProps = {
  reservation: IDoctorReservation;
  onClick?: () => void;
};

function DoctorReservation({ reservation }: DoctorReservationProps) {
  const { user } = useAuth();

  const { delReservation } = useDeleteReservation();

  function onCancelReservation() {
    toast.error("Are you sure you want to cancel this reservation?", {
      duration: Infinity,
      cancel: {
        label: "No",
        onClick: (e) => e.preventDefault(),
      },
      action: {
        label: "Yes",
        onClick: () => delReservation(reservation._id),
      },
    });
  }

  return (
    <>
      <td className="p-3 border border-gray-300">
        {reservation.patientId.fullName.split(" ").at(0)}{" "}
        {reservation.patientId.fullName.split(" ").at(-1)}
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
            <MdOutlineCancel
              size={20}
              onClick={onCancelReservation}
              className="text-red-500 cursor-pointer hover:text-red-800 duration-200"
            />
          )}
          <Modal>
            {user?.role !== "doctor" && (
              <>
                <Modal.Open opens="edit-patient">
                  <MdEdit
                    size={20}
                    className="text-amber-400 hover:text-amber-600 cursor-pointer duration-200"
                  />
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
    </>
  );
}

export default DoctorReservation;
