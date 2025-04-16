import { useContext } from "react";
import TableContext from "./Table";
import { FaCircle } from "react-icons/fa";

function CurrentShiftDoctor() {
  const tableContext = useContext(TableContext);
  const doctor = tableContext?.doctor;
  if (!doctor) return null;

  return (
    <>
      <td className="p-3 border border-gray-300">
        <img
          src={`http://localhost:3000/${doctor.avatar}`}
          alt={doctor.fullName + " photo"}
          className="w-12 h-12 rounded-full mx-auto"
        />
      </td>
      <td className="p-3 border border-gray-300">
        {doctor.fullName.split(" ")[0]} {doctor.fullName.split(" ")[3]}
      </td>
      <td className="p-3 border border-gray-300">{doctor.doctorInfo?.rank}</td>
      <td className="p-3 border border-gray-300">
        {typeof doctor.doctorInfo?.clinicId === "object"
          ? doctor.doctorInfo.clinicId?.name
          : doctor.doctorInfo?.clinicId}
      </td>
      <td className="p-3 border border-gray-300 text-center">
        {doctor.doctorInfo?.patientsHandled}/{doctor.doctorInfo?.totalPatients}
      </td>
      <td className="p-3 border border-gray-300">
        <div className={`w-full h-full flex justify-center items-center`}>
          <FaCircle
            className={`${
              doctor.doctorInfo?.isAvailable ? "text-green-400" : "text-red-400"
            }`}
          />
        </div>
      </td>
    </>
  );
}

export default CurrentShiftDoctor;
