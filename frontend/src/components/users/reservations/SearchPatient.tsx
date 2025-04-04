import { Field, Input, Label } from "@headlessui/react";
import { clsx } from "clsx";
import { Dispatch, FormEvent, useState } from "react";
import { getPatient } from "../../../services/apiPatients";

type SearchPatientProps = {
  onCloseModal: () => void;
  setPatientIsFound: Dispatch<React.SetStateAction<boolean | null>>;
};

function SearchPatient({
  onCloseModal,
  setPatientIsFound,
  setPhoneNumber,
  phoneNumber,
}: SearchPatientProps) {
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const data = await getPatient(phoneNumber);
      console.log(data);
      setPatientIsFound(true);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);

        setError(err.message);
        if (err.message === "Patient not found") setPatientIsFound(false);
        else setPatientIsFound(null);
      }
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <Field>
        <Label className="text-sm/6 font-medium text-black">Phone Number</Label>
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
      <div className="mt-8 flex justify-between">
        <button
          type="submit"
          className="mt-3 shadow-md rounded-lg border-none py-1.5 px-3 text-sm/6 text-white bg-primary duration-300 cursor-pointer"
        >
          Search
        </button>
        <button
          onClick={() => {
            onCloseModal();
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
