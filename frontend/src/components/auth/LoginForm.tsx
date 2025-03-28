import { Button, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from "../../pages/Login";

type LoginFormProps = {
  register: UseFormRegister<FormData>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<FormData>;
};
function LoginForm({ register, onSubmit, errors }: LoginFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="border rounded-md border-white/20 w-96 p-10 shadow-lg shadow-black/70"
    >
      <div className="w-full max-w-md px-1 mb-6">
        <Field>
          <Label className="text-sm/6 font-medium text-white">Email</Label>
          <Input
            {...register("email", { required: true })}
            data-focus
            className={clsx(
              `mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white`,
              `${
                errors.email
                  ? "data-[focus]:outline-red-500/60"
                  : "data-[focus]:outline-white/25"
              } focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2`
            )}
          />
        </Field>
      </div>
      <div className="w-full max-w-md px-1 mb-6">
        <Field>
          <Label className="text-sm/6 font-medium text-white">Password</Label>
          <Input
            {...register("password", { required: true })}
            data-focus
            type="password"
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              `${
                errors.password
                  ? "data-[focus]:outline-red-500/60"
                  : "data-[focus]:outline-white/25"
              } focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2`
            )}
          />
        </Field>
      </div>
      <div className="w-full max-w-md px-1">
        <Button
          type="submit"
          className="mt-3 block w-full rounded-lg border-none py-1.5 px-3 text-sm/6 text-white bg-primary duration-300  data-[hover]:bg-sky-600 cursor-pointer data-[active]:bg-sky-700"
        >
          Login
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
