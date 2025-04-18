import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { FieldErrors, UseFormReturn } from "react-hook-form";
import { AccountsFormData } from "../../../pages/admins/Accounts";

type UsersFormProps = {
  formType: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userForm: UseFormReturn<AccountsFormData, any, undefined>;
  errors: FieldErrors<AccountsFormData>;
};

function UsersForm({ formType, userForm, errors }: UsersFormProps) {
  const { register } = userForm;

  return (
    <>
      <Field className="mb-5">
        <Label
          className={`text-sm/6 font-medium ${
            errors.fullName ? "text-red-700" : "text-black"
          }`}
        >
          Full Name
        </Label>
        <Input
          {...register("fullName", { required: true })}
          data-focus
          className={clsx(
            `mt-2 block w-full rounded-lg border-none bg-primary/20 py-1.5 px-3 text-sm/6 text-black`,
            `focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/30`
          )}
        />
      </Field>

      <Field className="mb-5">
        <Label
          className={`text-sm/6 font-medium ${
            errors.email ? "text-red-700" : "text-black"
          }`}
        >
          Email
        </Label>
        <Input
          {...register("email", { required: true })}
          type="email"
          data-focus
          className={clsx(
            `mt-2 block w-full rounded-lg border-none bg-primary/20 py-1.5 px-3 text-sm/6 text-black`,
            `focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/30`
          )}
        />
      </Field>

      <Field className="mb-5">
        <Label
          className={`text-sm/6 font-medium ${
            errors.fullName ? "text-red-700" : "text-black"
          }`}
        >
          Phone Number
        </Label>
        <Input
          {...register("phoneNumber", { required: true })}
          data-focus
          className={clsx(
            `mt-2 block w-full rounded-lg border-none bg-primary/20 py-1.5 px-3 text-sm/6 text-black`,
            `focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/30`
          )}
        />
      </Field>

      <Field className="mb-5">
        <Label className="text-sm/6 font-medium text-black">Avatar</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          {...register("avatar")}
          data-focus
          className={clsx(
            `cursor-pointer mt-2 block w-full rounded-lg border-none bg-primary/20 py-1.5 px-3 text-sm/6 text-black`,
            `focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/30`
          )}
        />
      </Field>

      {formType === "user" && (
        <Field className="mb-5">
          <Label
            className={`text-sm/6 font-medium ${
              errors.role ? "text-red-700" : "text-black"
            }`}
          >
            Role
          </Label>

          <div className="flex justify-around items-center">
            <div className="flex gap-4">
              <Label
                htmlFor="receptionist"
                className="text-sm font-medium text-gray-500"
              >
                Receptionist
              </Label>
              <input
                id="receptionist"
                type="radio"
                value="receptionist"
                {...register("role", { required: true })}
              />
            </div>

            <div className="flex gap-4">
              <Label
                htmlFor="admin"
                className="text-sm font-medium text-gray-500"
              >
                Admin
              </Label>
              <input
                value="admin"
                id="admin"
                type="radio"
                {...register("role", { required: true })}
              />
            </div>
          </div>
        </Field>
      )}
    </>
  );
}

export default UsersForm;
