import { Button, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import IClinic from "../../../interfaces/Clinic";
import Loader from "../../../ui/Loader";
import { createClinic } from "../../../services/apiClinics";

function ClinicsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IClinic>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: IClinic) => {
    setIsLoading(true);
    try {
      // Call the API to create a clinic with the data
      const message = await createClinic(data);
      toast.success(message);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field className="mb-5">
        <Label
          className={`text-sm/6 font-medium ${
            errors.name ? "text-red-700" : "text-black"
          }`}
        >
          Clinic Name
        </Label>
        <Input
          data-focus
          {...register("name", { required: true })}
          className={clsx(
            `mt-2 block w-full rounded-lg border-none bg-primary/20 py-1.5 px-3 text-sm/6 text-black`,
            `focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/30`
          )}
        />
      </Field>

      <Field className="mb-5">
        <Label
          className={`text-sm/6 font-medium ${
            errors.floor ? "text-red-700" : "text-black"
          }`}
        >
          Floor
        </Label>
        <Input
          data-focus
          {...register("floor", { required: true })}
          className={clsx(
            `mt-2 block w-full rounded-lg border-none bg-primary/20 py-1.5 px-3 text-sm/6 text-black`,
            `focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/30`
          )}
        />
      </Field>

      <Field className="mb-5">
        <Label
          className={`text-sm/6 font-medium ${
            errors.roomNumber ? "text-red-700" : "text-black"
          }`}
        >
          Room Number
        </Label>
        <Input
          data-focus
          {...register("roomNumber", { required: true })}
          className={clsx(
            `mt-2 block w-full rounded-lg border-none bg-primary/20 py-1.5 px-3 text-sm/6 text-black`,
            `focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/30`
          )}
        />
      </Field>
      <div className="flex justify-center">
        <Button
          // onClick={handleSubmit(onValid, onInvalid)}
          type="submit"
          className="mt-3 block rounded-lg border-none py-2 px-9 text-sm/6 text-white bg-primary duration-300  data-[hover]:bg-sky-600 cursor-pointer data-[active]:bg-sky-700"
        >
          {isLoading ? <Loader size={18} /> : "Create Clinic"}
        </Button>
      </div>
    </form>
  );
}

export default ClinicsForm;
