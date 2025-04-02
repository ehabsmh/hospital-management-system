import Loader from "../../../ui/Loader";
import useCurrentDoctors from "../../../hooks/useCurrentDoctors";
import Table from "./Table";
import ICurrentShift from "../../../interfaces/CurrentShift";

function CurrentShift() {
  const { isLoading, currentShift, error } = useCurrentDoctors();

  const currShift: ICurrentShift = currentShift;

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center">
          <Loader size={30} color={"#23B1F8"} />
        </div>
      )}
      {!isLoading && error && (
        <div className="h-screen flex justify-center items-center">
          <p className="text-red-500">{error.message}</p>
        </div>
      )}
      {!isLoading && !error && (
        <Table>
          <Table.Header>
            <th className="p-3 border border-gray-300">Avatar</th>
            <th className="p-3 border border-gray-300">Doctor</th>
            <th className="p-3 border border-gray-300">Rank</th>
            <th className="p-3 border border-gray-300">Clinic</th>
            <th className="p-3 border border-gray-300">Patients Handled</th>
            <th className="p-3 border border-gray-300">Status</th>
          </Table.Header>
          <Table.Body
            render={() =>
              currShift.doctors.map((doctor) => (
                <Table.Row key={doctor._id} doctor={doctor}>
                  <td className="p-3 border border-gray-300 text-center">
                    <img
                      src={doctor.avatar}
                      alt="Doctor Avatar"
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                  <td className="p-3 border border-gray-300">
                    {doctor.fullName.split(" ")[0]}{" "}
                    {doctor.fullName.split(" ")[3]}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {doctor.doctorInfo?.rank}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {typeof doctor.doctorInfo?.clinicId === "object"
                      ? doctor.doctorInfo.clinicId?.name
                      : "x"}
                  </td>
                  <td className="p-3 border border-gray-300 text-center">
                    {doctor.doctorInfo?.patientsHandled}/
                    {doctor.doctorInfo?.totalPatients}
                  </td>
                  <td className="p-3 border border-gray-300">
                    <div
                      className={`w-full h-full flex justify-center items-center`}
                    >
                      <p className="w-4 h-4 bg-red-500 rounded-full"></p>
                    </div>
                  </td>
                </Table.Row>
              ))
            }
          />
        </Table>
      )}
    </>
  );
}

export default CurrentShift;
