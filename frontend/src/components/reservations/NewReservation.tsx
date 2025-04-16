import { Dispatch, SetStateAction, useEffect, useState } from "react";
import IPatient from "../../interfaces/Patient";
import useNewReservation from "./useNewReservation";
import { useSearchParams } from "react-router-dom";
import { getConsultation } from "../../services/apiConsultations";
import { fetchPatient } from "../../services/apiPatients";
import { toast } from "sonner";
import { MdClose } from "react-icons/md";

type ReservationProps = {
  phoneNumber: string;
  setPatientIsFound: Dispatch<SetStateAction<null | boolean>>;
  onCloseModal?: () => void;
};
function Reservation({
  phoneNumber,
  setPatientIsFound,
  onCloseModal,
}: ReservationProps) {
  const [patient, setPatient] = useState<IPatient | null>(null);
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("id");
  const { newReservation } = useNewReservation(doctorId!);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function getPatient() {
        const patient = await fetchPatient(phoneNumber);

        if (patient) setPatient(patient);
        else setPatient(null);
      }
      getPatient();
    },
    [phoneNumber]
  );

  function onReserveCheck() {
    if (doctorId && patient) {
      newReservation({ doctorId, patientId: patient._id });
      onCloseModal?.();
      setPatientIsFound(null);
    }
  }

  async function onReserveConsultation() {
    const typeConsultationId = "67e04d4e182214fdd7282915";

    try {
      if (doctorId && patient) {
        await getConsultation({
          doctorId,
          patientId: patient?._id,
        });

        newReservation({
          doctorId: doctorId,
          patientId: patient._id,
          reservationTypeId: typeConsultationId,
        });

        onCloseModal?.();
        setPatientIsFound(null);
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        setError(err.message);
      }
    }
  }

  return (
    <div className="border relative rounded-md border-white/20 w-96 p-10 shadow-lg shadow-black/70">
      <MdClose
        onClick={onCloseModal}
        className="absolute top-0 right-0 border border-gray-300 cursor-pointer"
        size={25}
      />
      <div className="grid grid-cols-3 mb-3">
        <p className="font-bold">ID</p>
        <p className="col-span-2">{patient?._id}</p>
      </div>

      <div className="grid grid-cols-3 mb-3">
        <p className="font-bold ">Name</p>
        <p className="col-span-2">{patient?.fullName}</p>
      </div>

      <div className="grid grid-cols-3 mb-3">
        <p className="font-bold ">Age</p>
        <p className="col-span-2">{patient?.age}</p>
      </div>

      <div className="grid grid-cols-3 mb-3">
        <p className="font-bold ">Job</p>
        <p className="col-span-2">{patient?.job}</p>
      </div>

      <div className="grid grid-cols-3 mb-3">
        <p className="font-bold ">Phone</p>
        <p className="">{patient?.phoneNumber}</p>
      </div>
      <div className="flex justify-center gap-8">
        <button
          onClick={onReserveCheck}
          type="submit"
          className="mt-3 shadow-md rounded-lg border-none py-2 px-5 text-sm/6 text-white bg-primary duration-300 cursor-pointer hover:bg-primary-dark"
        >
          Check
        </button>

        {error !== "Consultation not found" && (
          <button
            onClick={onReserveConsultation}
            type="submit"
            className="mt-3 shadow-md rounded-lg border-none py-2 px-5 text-sm/6 text-white bg-primary duration-300 cursor-pointer hover:bg-primary-dark"
          >
            Consult
          </button>
        )}
      </div>
    </div>
  );
}

export default Reservation;
