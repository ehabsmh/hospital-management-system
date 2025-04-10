/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "@headlessui/react";
import FormAccounts from "../../ui/FormAccounts";
import UsersForm from "../../components/Forms/UsersForm";
import DoctorsForm from "../../components/Forms/DoctorsForm";
import ClinicsForm from "../../components/Forms/ClinicsForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { signup } from "../../services/apiAuth";
import { toast } from "sonner";
import Loader from "../../ui/Loader";

export type AccountsFormData = {
  fullName: string;
  role: "receptionist" | "admin" | "doctor";
  phoneNumber: string;
  email: string;
  avatar: FileList | string;
  doctorInfo: {
    rank: string;
    clinicId: string;
  };
};

function Accounts() {
  const [formType, setFormType] = useState("user");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AccountsFormData>();

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = form;

  console.log(getValues());

  const onValid: SubmitHandler<AccountsFormData> = async (data) => {
    setIsLoading(true);
    try {
      const file = data.avatar?.[0];

      if (!file) setValue("avatar", undefined);

      if (file instanceof File) {
        console.log("y");

        setValue("avatar", file.name);
      }

      const message = await signup(data);
      toast.success(message);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onInvalid = (err: any) => console.log(err);

  useEffect(
    function () {
      const formValues = getValues();
      if (formType === "user" && formValues.doctorInfo) {
        setValue("doctorInfo", null);
      }
    },
    [formType, getValues, setValue]
  );

  return (
    <FormAccounts layerBgColor="bg-white/80">
      <div className="border rounded-md border-white/20 w-96 p-10 shadow-lg shadow-black/70 bg-white/60 overflow-auto">
        <div className="flex justify-center gap-4 mb-6">
          <Button
            className={`mt-3 block w-28 rounded-lg border-none py-1.5 px-3 text-sm text-white bg-primary duration-300 cursor-pointer ${
              formType === "user" ? "bg-primary-darker" : "bg-primary"
            }`}
            onClick={() => setFormType("user")}
          >
            User
          </Button>
          <Button
            className={`mt-3 block w-28 rounded-lg border-none py-1.5 px-3 text-sm text-white bg-primary duration-300 cursor-pointer ${
              formType === "doctor" ? "bg-primary-darker" : "bg-primary"
            }`}
            onClick={() => setFormType("doctor")}
          >
            Doctor
          </Button>
          <Button
            className={`mt-3 block w-28 rounded-lg border-none py-1.5 px-3 text-sm text-white bg-primary duration-300 cursor-pointer ${
              formType === "clinic" ? "bg-primary-darker" : "bg-primary"
            }`}
            onClick={() => setFormType("clinic")}
          >
            Clinic
          </Button>
        </div>

        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          {formType !== "clinic" && (
            <UsersForm formType={formType} userForm={form} errors={errors} />
          )}

          {formType === "doctor" && <DoctorsForm doctorForm={form} />}

          {formType === "clinic" && <ClinicsForm />}

          <div className="flex justify-center">
            <Button
              onClick={handleSubmit(onValid, onInvalid)}
              type="submit"
              className="mt-3 block rounded-lg border-none py-2 px-9 text-sm/6 text-white bg-primary duration-300  data-[hover]:bg-sky-600 cursor-pointer data-[active]:bg-sky-700"
            >
              {isLoading ? (
                <Loader size={18} />
              ) : formType === "clinic" ? (
                "Create Clinic"
              ) : (
                "Sign up"
              )}
            </Button>
          </div>
        </form>
      </div>
    </FormAccounts>
  );
}

export default Accounts;
