import { Button, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { addPatient } from "../../../services/apiPatients";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReservation } from "../../../services/apiReservations";
import { useSearchParams } from "react-router-dom";
import Loader from "../../../ui/Loader";

export type PatientFormData = {
  fullName: string;
  job: string;
  phoneNumber: string;
  age: number;
};

function AddPatient({ onCloseModal, setPatientIsFound, phoneNumber }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PatientFormData>();

  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("id");
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);

  const { mutate: newReservation } = useMutation({
    mutationFn: createReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctor-reservations", doctorId],
      });
      onCloseModal?.();
      setPatientIsFound(null);
    },
  });

  const [error, setError] = useState("");

  async function onSubmit(patientInfo: PatientFormData) {
    setIsLoading(true);
    try {
      const patient = await addPatient(patientInfo);

      if (!doctorId) {
        setError("No doctor id found");
        return;
      }

      newReservation({ doctorId, patientId: patient._id });

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
    },
    [phoneNumber, setValue]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border rounded-md border-white/20 w-96 p-10 shadow-lg shadow-black/70"
    >
      <h2 className="mb-3 font-bold text-lg">New patient</h2>
      <p className="error text-red-400">{error}</p>
      <Field className="mb-4">
        <Label className="text-sm/6 font-medium text-black">Full Name</Label>
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
        <Label className="text-sm/6 font-medium text-black">Job</Label>
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
        <Label className="text-sm/6 font-medium text-black">Phone Number</Label>
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
        <Label className="text-sm/6 font-medium text-black">Age</Label>
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
          {isLoading ? <Loader size={20} /> : "Add patient"}
        </Button>
        <button
          onClick={() => {
            onCloseModal();
            setPatientIsFound(null);
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
