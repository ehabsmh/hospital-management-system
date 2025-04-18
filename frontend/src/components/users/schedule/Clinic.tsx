import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import IClinic from "../../../interfaces/Clinic";
import { useState } from "react";
import { IUser } from "../../../interfaces/User";
import { fetchDoctorsByClinicId } from "../../../services/apiDoctors";
import { toast } from "sonner";
import Loader from "../../../ui/Loader";
import { MdDelete } from "react-icons/md";
import { useAuth } from "../../auth/useAuth";
import useDoctorByShift from "./useDoctorByShift";
import useAddDoctorToShift from "./useAddDoctorToShift";
import useDeleteDoctorFromShift from "./useDeleteDoctorFromShift";

type ClinicProps = {
  clinic: IClinic;
  groupId: string;
  shiftId: string;
  setClinicIdToDeleteDr: React.Dispatch<React.SetStateAction<string | null>>;
  showDeleteIcon: boolean;
};

function Clinic({
  clinic,
  groupId,
  shiftId,
  setClinicIdToDeleteDr,
  showDeleteIcon,
}: ClinicProps) {
  const { doctor, isError, isLoading } = useDoctorByShift(shiftId, {
    groupId,
    clinicId: clinic._id,
  });

  const { newDoctorToShift } = useAddDoctorToShift({
    clinicId: clinic._id,
    groupId,
    shiftId,
  });

  const { delDoctorFromShift } = useDeleteDoctorFromShift({
    clinicId: clinic._id,
    groupId,
    shiftId,
  });

  const { user } = useAuth();

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

  function onRemoveDoctorFromShift() {
    toast.error("Are you sure you want to remove doctor from shift?", {
      duration: Infinity,
      cancel: {
        label: "No",
        onClick: (e) => {
          e.preventDefault();
        },
      },
      action: {
        label: "Yes",
        onClick: () => {
          delDoctorFromShift({
            doctorId: doctor!._id,
            shiftId,
            groupId,
          });
        },
      },
    });
  }

  return (
    <>
      <div
        className="text-sm px-3 py-2 bg-blue-100 rounded-md mt-6"
        onMouseLeave={() => setClinicIdToDeleteDr(null)}
      >
        {isLoading && !isError && <Loader size={13} color="#000" />}

        {!isLoading && user?.role === "receptionist" && (
          <div
            className="min-w-52 grid grid-cols-2"
            onMouseLeave={() => setClinicIdToDeleteDr(null)}
          >
            {isError ? (
              <p className="text-red-400 font-medium">None</p>
            ) : (
              <p className="font-medium">Dr. {doctor?.fullName}</p>
            )}
            <p>{clinic.name}</p>
          </div>
        )}

        {!isLoading && user?.role === "admin" && (
          <div className="min-w-52 grid grid-cols-2">
            {isError &&
              (isAdding ? (
                <FaMinusCircle
                  onClick={() => setIsAdding(false)}
                  className="text-gray-500  duration-150 text-lg hover:text-xl cursor-pointer"
                />
              ) : (
                <FaPlusCircle
                  onClick={getDoctorsByClinicId}
                  className="text-green-600 hover:text-green-700 duration-150 text-lg hover:text-xl cursor-pointer"
                />
              ))}

            {!isError && (
              <>
                {showDeleteIcon ? (
                  <MdDelete
                    onClick={onRemoveDoctorFromShift}
                    size={19}
                    className="text-red-500 cursor-pointer"
                  />
                ) : (
                  <p
                    onMouseLeave={() => setClinicIdToDeleteDr(null)}
                    onMouseOver={() => setClinicIdToDeleteDr(clinic._id)}
                  >
                    Dr. {doctor?.fullName}
                  </p>
                )}
              </>
            )}
            <p>{clinic.name}</p>
          </div>
        )}
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
