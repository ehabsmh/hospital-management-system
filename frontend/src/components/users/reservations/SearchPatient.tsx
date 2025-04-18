import { Field, Input, Label } from "@headlessui/react";
import { clsx } from "clsx";
import React, { Dispatch, FormEvent, useState } from "react";
import useDoctorReservations from "./useDoctorReservations";
import { useSearchParams } from "react-router-dom";
import { fetchPatient } from "../../../services/apiPatients";

type SearchPatientProps = {
  onCloseModal?: () => void;
  setPatientIsFound: Dispatch<React.SetStateAction<boolean | null>>;
  phoneNumber: string;
  setPhoneNumber: Dispatch<React.SetStateAction<string>>;
};

function SearchPatient({
  onCloseModal,
  setPatientIsFound,
  setPhoneNumber,
  phoneNumber,
}: SearchPatientProps) {
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("id");

  const { doctorReservations } = useDoctorReservations(doctorId!);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    // Check if patient has already reserved with the doctor
    const patientReserved = doctorReservations?.find(
      (reservation) => reservation.patientId.phoneNumber === phoneNumber
    );

    if (patientReserved) {
      setError("Patient already reserved with the doctor");
      return;
    }

    try {
      const data = await fetchPatient(phoneNumber);
      console.log(data);
      setPatientIsFound(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        if (err.message === "Patient not found") setPatientIsFound(false);
        else setPatientIsFound(null);
      }
    }
  }
  return (
    <form
      onSubmit={onSubmit}
      className="border rounded-md border-white/20 w-96 p-10 shadow-lg shadow-black/70"
    >
      <p className="mb-7 text-red-400">{error}</p>
      <Field>
        <Label className="text-sm/6 font-medium text-black">
          Patient Phone Number
        </Label>
        <Input
          data-focus
          value={phoneNumber}
          type="number"
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={clsx(
            `mt-3 block w-full rounded-lg border-none py-1.5 px-3 text-sm/6 text-white`,
            `data-[focus]:outline-white/25 focus:outline-none data-[focus]:outline-2 data-[focus]:bg-black/40 data-[focus]:-outline-offset-2`
          )}
        />
      </Field>
      <div className="mt-8 flex justify-center gap-8">
        <button
          type="submit"
          className="mt-3 shadow-md rounded-lg border-none py-1.5 px-3 text-sm/6 text-white bg-primary duration-300 cursor-pointer"
        >
          Search
        </button>
        <button
          onClick={() => {
            onCloseModal?.();
            setPhoneNumber("");
          }}
          type="reset"
          className="mt-3 shadow-md rounded-lg border-none py-1.5 px-3 text-sm/6 text-black bg-gray-300 duration-300 hover:bg-gray-400/70 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default SearchPatient;
