import { useState } from "react";
import IClinic from "../../../interfaces/Clinic";
import IShift from "../../../interfaces/Shift";
import Clinic from "./Clinic";

type ShiftProps = {
  shift: IShift;
  clinics: IClinic[];
  groupId: string;
};

function Shift({ shift, clinics, groupId }: ShiftProps) {
  const [clinicIdToDeleteDr, setClinicIdToDeleteDr] = useState<string | null>(
    null
  );
  return (
    <div className="border border-gray-300 mb-5 rounded-xl p-4 shadow-lg bg-white">
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
            setClinicIdToDeleteDr={setClinicIdToDeleteDr}
            showDeleteIcon={clinic._id === clinicIdToDeleteDr ? true : false}
          />
        ))}
      </div>
    </div>
  );
}

export default Shift;
