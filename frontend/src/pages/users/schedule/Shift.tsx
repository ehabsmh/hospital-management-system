import IClinic from "../../../interfaces/Clinic";
import IShift from "../../../interfaces/Shift";
import Clinic from "./Clinic";

type ShiftProps = {
  shift: IShift;
  clinics: IClinic[];
  groupId: string;
};

function Shift({ shift, clinics, groupId }: ShiftProps) {
  return (
    <div className="border rounded-xl p-4 shadow-md bg-white">
      <div className="font-medium text-gray-700">
        {shift.startTime} - {shift.endTime}
      </div>
      <div className="mt-2 space-y-3">
        {clinics.map((clinic) => (
          <Clinic
            key={clinic._id}
            clinic={clinic}
            groupId={groupId}
            shiftId={shift._id}
          />
        ))}
      </div>
    </div>
  );
}

export default Shift;
