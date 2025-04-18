import Loader from "../../../ui/Loader";
import useCurrentDoctors from "../../../hooks/useCurrentDoctors";
import CurrentShiftDoctor from "../../../components/users/current-shift/CurrentShiftDoctor";
import { Table } from "../../../ui/Table";

const currShiftCols = [
  "Avatar",
  "Doctor",
  "Rank",
  "Clinic",
  "Patients Handled",
  "Status",
];

function CurrentShift() {
  const { isLoading, currentShift, error } = useCurrentDoctors();

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
            <Table.Columns headers={currShiftCols} />
          </Table.Header>
          <Table.Body
            render={() =>
              currentShift?.doctors.map((doctor) => (
                <Table.Row key={doctor._id} doctor={doctor}>
                  <CurrentShiftDoctor />
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
