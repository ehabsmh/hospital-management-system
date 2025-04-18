import { Field, Label, Select } from "@headlessui/react";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { UseFormReturn } from "react-hook-form";
import { AccountsFormData } from "../../../pages/admins/Accounts";
import IClinic from "../../../interfaces/Clinic";
import { fetchClinics } from "../../../services/apiClinics";

type UsersFormProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  doctorForm: UseFormReturn<AccountsFormData, any, undefined>;
};
function DoctorsForm({ doctorForm }: UsersFormProps) {
  const [clinics, setClinics] = useState<IClinic[] | null>(null);
  const { register, setValue } = doctorForm;

  const getClinics = useCallback(async function () {
    try {
      const clinics = await fetchClinics();

      if (clinics?.length) setClinics(clinics);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  }, []);

  useEffect(
    function () {
      getClinics();
      setValue("role", "doctor");
    },
    [getClinics, setValue]
  );
  return (
    <>
      <Field className="mb-5">
        <Label className="text-sm/6 font-medium dark:text-white text-black">
          Doctor Rank
        </Label>
        <Select
          {...register("doctorInfo.rank", { required: true })}
          data-focus
          className={clsx(
            `cursor-pointer mt-2 block w-full rounded-lg border-none bg-primary/20 py-1.5 px-3 text-sm/6 text-black`,
            `focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/30`
          )}
        >
          <option value="">Select Rank</option>
          <option value="استشاري">استشاري</option>
          <option value="طبيب عام">طبيب عام</option>
          <option value="اخصائي">اخصائي</option>
        </Select>
      </Field>

      <Field className="mb-5">
        <Label className="text-sm/6 font-medium text-black">Clinic</Label>
        <Select
          {...register("doctorInfo.clinicId", { required: true })}
          data-focus
          className={clsx(
            `cursor-pointer mt-2 block w-full rounded-lg border-none bg-primary/20 py-1.5 px-3 text-sm/6 text-black`,
            `focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/30`
          )}
        >
          <option value="">Select Specialty</option>
          {clinics?.map((clinic) => (
            <>
              <option key={clinic._id} value={clinic._id}>
                {clinic.name}
              </option>
            </>
          ))}
        </Select>
      </Field>
    </>
  );
}

export default DoctorsForm;
