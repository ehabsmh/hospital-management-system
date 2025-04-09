import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import IClinic from "../../../interfaces/Clinic";
import { useState } from "react";
import { IUser } from "../../../interfaces/User";
import { fetchDoctorsByClinicId } from "../../../services/apiDoctors";
import { toast } from "sonner";
import useDoctorByShift from "./useDoctorByShift";
import useAddDoctorToShift from "./useAddDoctorToShift";

type ClinicProps = {
  clinic: IClinic;
  groupId: string;
  shiftId: string;
};

function Clinic({ clinic, groupId, shiftId }: ClinicProps) {
  const { doctor } = useDoctorByShift(shiftId, {
    groupId,
    clinicId: clinic._id,
  });

  const { newDoctorToShift } = useAddDoctorToShift({
    clinicId: clinic._id,
    groupId,
    shiftId,
  });

  const [isAdding, setIsAdding] = useState(false);

  const [doctorsToAssign, setDoctorsToAssign] = useState<IUser[] | null>(null);

  // Doctors not yet assigned to a shift by clinic id
  async function getDoctorsByClinicId() {
    const doctors = await fetchDoctorsByClinicId(clinic._id);

    if (!doctors?.length) {
      setIsAdding(false);
      toast.error("No doctors found to add.", {
        position: "top-center",
        style: { backgroundColor: "#23B1F8", color: "white" },
      });
    }

    if (doctors?.length) {
      setIsAdding(true);
      setDoctorsToAssign(doctors);
    }
  }

  return (
    <>
      <div
        key={clinic._id}
        className="text-sm px-3 py-2 bg-blue-100 rounded-md"
      >
        <div className="min-w-52 grid grid-cols-2 justify-between">
          {!doctor ? (
            isAdding ? (
              <FaMinusCircle
                onClick={() => setIsAdding(false)}
                className="text-gray-500  duration-150 text-lg hover:text-xl cursor-pointer"
              />
            ) : (
              <FaPlusCircle
                onClick={getDoctorsByClinicId}
                className="text-green-600 hover:text-green-700 duration-150 text-lg hover:text-xl cursor-pointer"
              />
            )
          ) : (
            <p>Dr. {doctor?.fullName}</p>
          )}
          <p>{clinic.name}</p>
        </div>
      </div>
      {isAdding && (
        <div className="bg-zinc-50">
          {doctorsToAssign?.map((doctor) => (
            <option
              key={doctor._id}
              value="doctor"
              className="mb-2 hover:bg-gray-100 p-2 cursor-pointer duration-150"
              onClick={() => {
                setIsAdding(false);

                newDoctorToShift({ doctorId: doctor._id, shiftId, groupId });
              }}
            >
              {doctor.fullName}
            </option>
          ))}
        </div>
      )}
    </>
  );
}

export default Clinic;
