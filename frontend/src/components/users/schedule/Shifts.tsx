/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import IShift from "../../../interfaces/Shift";
import { fetchShifts } from "../../../services/apiShifts";
import Shift from "./Shift";
import { fetchClinics } from "../../../services/apiClinics";
import IClinic from "../../../interfaces/Clinic";

type ShiftsProps = {
  groupId: string;
};

function Shifts({ groupId }: ShiftsProps) {
  const [shifts, setShifts] = useState<IShift[] | null>(null);
  const [clinics, setClinics] = useState<IClinic[]>([]);
  const [shiftError, setShiftError] = useState("");
  const [clinicError, setClinicError] = useState("");

  async function getClinics() {
    try {
      const clinicsData = await fetchClinics();
      return clinicsData;
    } catch (err) {
      if (err instanceof Error) setClinicError(err.message);
    }
  }

  useEffect(function () {
    async function getShifts() {
      try {
        const shiftsData = await fetchShifts();
        const clinicsData = await getClinics();

        if (clinicsData) setClinics(clinicsData);

        if (shiftsData) setShifts(shiftsData);
      } catch (err) {
        if (err instanceof Error) setShiftError(err.message);
      }
    }
    getShifts();
  }, []);

  return (
    <div>
      {shifts?.map((shift) => (
        <Shift
          key={shift._id}
          shift={shift}
          clinics={clinics}
          groupId={groupId}
        />
      ))}
    </div>
  );
}

export default Shifts;
