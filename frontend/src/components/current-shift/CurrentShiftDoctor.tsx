import { useContext } from "react";
import TableContext from "./Table";

function CurrentShiftDoctor() {
  const tableContext = useContext(TableContext);
  const doctor = tableContext?.doctor;
  if (!doctor) return null;
  console.log(doctor.avatar);

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
          <p className="w-4 h-4 bg-red-500 rounded-full"></p>
        </div>
      </td>
    </>
  );
}

export default CurrentShiftDoctor;
