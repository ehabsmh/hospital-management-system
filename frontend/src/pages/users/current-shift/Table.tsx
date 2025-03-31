import TableHead from "./TableHead";
import TableRow from "./TableRow";
import ICurrentShift from "./../../../interfaces/CurrentShift";

function Table({ currShiftDoctors }: { currShiftDoctors: ICurrentShift }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 text-center">
        <TableHead />
        <tbody>
          {currShiftDoctors.doctors.map((doctor) => (
            <TableRow key={doctor._id} doctor={doctor} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
