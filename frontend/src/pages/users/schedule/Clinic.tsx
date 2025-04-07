import { FaPlusCircle } from "react-icons/fa";
import IClinic from "../../../interfaces/Clinic";
import { fetchDoctorByShift } from "../../../services/apiShifts";
import { useEffect, useState } from "react";
import { IUser } from "../../../interfaces/User";

type ClinicProps = {
  clinic: IClinic;
  groupId: string;
  shiftId: string;
};

function Clinic({ clinic, groupId, shiftId }: ClinicProps) {
  const [doctor, setDoctor] = useState<IUser>();
  useEffect(
    function () {
      async function getDoctorByShift() {
        try {
          const params = { groupId, clinicId: clinic._id };
          const doctor = await fetchDoctorByShift(params, shiftId);
          setDoctor(doctor);
        } catch (err) {
          if (err instanceof Error) console.error(err.message);
        }
      }
      getDoctorByShift();
    },
    [clinic._id, groupId, shiftId]
  );
  return (
    <div key={clinic._id} className="text-sm px-3 py-2 bg-blue-100 rounded-md">
      <div className="min-w-52 grid grid-cols-2">
        {!doctor ? (
          <FaPlusCircle className="text-green-600 hover:text-green-700 duration-150 text-lg hover:text-xl cursor-pointer" />
        ) : (
          <p>Dr. {doctor?.fullName}</p>
        )}
        <p>{clinic.name}</p>
      </div>
    </div>
  );
}

export default Clinic;
