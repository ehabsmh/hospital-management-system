import { useNavigate } from "react-router-dom";
import { IUser } from "../../../interfaces/User";

function TableRow({ doctor }: { doctor: IUser }) {
  const navigate = useNavigate();

  function goToDoctorReservations() {
    navigate(`/doctor/${doctor._id}`);
  }

  return (
    <tr onClick={goToDoctorReservations}>
      <td className="p-3 border border-gray-300 text-center">
        <img
          src={doctor.avatar}
          alt="Doctor Avatar"
          className="w-10 h-10 rounded-full mx-auto"
        />
      </td>
      <td className="p-3 border border-gray-300">
        {doctor.fullName.split(" ")[0]} {doctor.fullName.split(" ")[3]}
      </td>
      <td className="p-3 border border-gray-300">{doctor.doctorInfo?.rank}</td>
      <td className="p-3 border border-gray-300">
        {typeof doctor.doctorInfo?.clinicId === "object" &&
          doctor.doctorInfo.clinicId.name}
      </td>
      <td className="p-3 border border-gray-300 text-center">
        {doctor.doctorInfo?.patientsHandled}/{doctor.doctorInfo?.totalPatients}
      </td>
      <td className="p-3 border border-gray-300">
        <div className={`w-full h-full flex justify-center items-center`}>
          <p className="w-4 h-4 bg-red-500 rounded-full"></p>
        </div>
      </td>
    </tr>
  );
}

export default TableRow;
