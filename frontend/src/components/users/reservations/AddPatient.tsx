import { Button, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { addPatient, editPatient } from "../../../services/apiPatients";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../../../ui/Loader";
import useNewReservation from "./useNewReservation";
import IPatient from "../../../interfaces/Patient";
import { useQueryClient } from "@tanstack/react-query";

export type PatientFormData = {
  _id: string;
  fullName: string;
  job: string;
  phoneNumber: string;
  age: number;
};

type AddPatientProps = {
  onCloseModal?: () => void;
  setPatientIsFound?: Dispatch<SetStateAction<null | boolean>>;
  phoneNumber: string;
  patientToEdit?: IPatient;
};

function AddPatient({
  onCloseModal,
  setPatientIsFound,
  phoneNumber,
  patientToEdit,
}: AddPatientProps) {
  const { register, handleSubmit, setValue } = useForm<PatientFormData>();

  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("id");
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const { newReservation } = useNewReservation(doctorId!);

  const [error, setError] = useState("");

  async function onSubmit(patientInfo: PatientFormData) {
    setIsLoading(true);
    try {
      // Add new patient
      if (!patientToEdit) {
        const patient = await addPatient(patientInfo);

        if (!doctorId) {
          setError("No doctor id found");
          return;
        }

        newReservation({ doctorId, patientId: patient._id });
      }

      // Edit a patient
      if (patientToEdit) {
        const { _id } = patientToEdit;
        patientInfo._id = _id;

        await editPatient(patientInfo);
        queryClient.invalidateQueries({ queryKey: ["doctor-reservations"] });
      }

      onCloseModal?.();
      if (!patientToEdit) setPatientIsFound?.(null);

      setError("");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(
    function () {
      setValue("phoneNumber", phoneNumber);
      if (patientToEdit) {
        setValue("fullName", patientToEdit.fullName);
        setValue("job", patientToEdit.job);
        setValue("age", patientToEdit.age);
      }
    },
    [phoneNumber, setValue, patientToEdit]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border rounded-md border-white/20 w-96 p-10 shadow-lg shadow-black/70"
    >
      {!patientToEdit && (
        <h2 className="mb-3 font-bold text-lg">New patient</h2>
      )}
      <p className="error text-red-400">{error}</p>
      <Field className="mb-4">
        <Label className="text-sm/6 font-medium dark:text-white text-black">
          Full Name
        </Label>
        <Input
          data-focus
          {...register("fullName", { required: true })}
          className={clsx(
            `mt-3 block w-full rounded-lg border-none bg-black/40 py-1.5 px-3 text-sm/6 text-white`,
            `data-[focus]:outline-white/25 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2`
          )}
        />
      </Field>

      <Field className="mb-4">
        <Label className="text-sm/6 font-medium dark:text-white text-black">
          Job
        </Label>
        <Input
          data-focus
          {...register("job", { required: true })}
          className={clsx(
            `mt-3 block w-full rounded-lg border-none bg-black/40 py-1.5 px-3 text-sm/6 text-white`,
            `data-[focus]:outline-white/25 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2`
          )}
        />
      </Field>
      <Field className="mb-4">
        <Label className="text-sm/6 font-medium dark:text-white text-black">
          Phone Number
        </Label>
        <Input
          data-focus
          {...register("phoneNumber", { required: true })}
          className={clsx(
            `mt-3 block w-full rounded-lg border-none bg-black/40 py-1.5 px-3 text-sm/6 text-white`,
            `data-[focus]:outline-white/25 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2`
          )}
        />
      </Field>

      <Field className="mb-6 w-16">
        <Label className="text-sm/6 font-medium dark:text-white text-black">
          Age
        </Label>
        <Input
          data-focus
          type="number"
          {...register("age", { required: true })}
          className={clsx(
            `mt-3 block w-full rounded-lg border-none bg-black/40 py-1.5 px-3 text-sm/6 text-white`,
            `data-[focus]:outline-white/25 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2`
          )}
        />
      </Field>

      <div className="w-full max-w-md px-1 flex justify-between">
        <Button
          type="submit"
          className="mt-3 shadow-md rounded-lg border-none py-1.5 px-3 text-sm/6 text-white bg-primary duration-300  data-[hover]:bg-sky-600 cursor-pointer data-[active]:bg-sky-700"
        >
          {isLoading ? (
            <Loader size={20} />
          ) : patientToEdit ? (
            "Edit Patient"
          ) : (
            "Add patient"
          )}
        </Button>
        <button
          onClick={() => {
            onCloseModal?.();
            if (!patientToEdit) setPatientIsFound?.(null);
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

export default AddPatient;
