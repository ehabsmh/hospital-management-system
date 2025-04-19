import { Button, Field, Input, Textarea } from "@headlessui/react";
import clsx from "clsx";
import { UseFormRegister } from "react-hook-form";
import ICaseRecord from "../../../interfaces/CaseRecord";

type CreateReportProps = {
  register: UseFormRegister<ICaseRecord>;
  setRecordType: React.Dispatch<React.SetStateAction<string>>;
};

function CreateReport({ setRecordType, register }: CreateReportProps) {
  return (
    <>
      <Field className="mb-5">
        <Input
          {...register("report.title")}
          data-focus
          placeholder="Title"
          className={clsx(
            `mt-2 block w-full rounded-lg border-none bg-primary/20 py-1.5 px-3 text-sm/6 dark:text-white text-black`,
            `focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/30`
          )}
        />
      </Field>

      <Field className="mb-5">
        <Textarea
          {...register("report.body")}
          data-focus
          placeholder="Body"
          className={clsx(
            `mt-2 block w-full rounded-lg border-none bg-primary/20 py-1.5 px-3 text-sm/6 dark:text-white text-black`,
            `focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/30`
          )}
        />
      </Field>
      <div className="text-end">
        <Button
          onClick={() => setRecordType("Prescription")}
          type="button"
          className="mt-3 shadow-md rounded-lg border-none py-1.5 px-7 text-sm/6 text-white bg-primary data-[disabled]:bg-primary/50 duration-300  data-[hover]:bg-sky-600 cursor-pointer data-[active]:bg-sky-700"
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default CreateReport;
