import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";

function ClinicsForm() {
  return (
    <>
      <Field className="mb-5">
        <Label className="text-sm/6 font-medium text-black">Clinic Name</Label>
        <Input
          data-focus
          className={clsx(
            `mt-2 block w-full rounded-lg border-none bg-primary/20 py-1.5 px-3 text-sm/6 text-black`,
            `focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/30`
          )}
        />
      </Field>

      <Field className="mb-5">
        <Label className="text-sm/6 font-medium text-black">Floor</Label>
        <Input
          data-focus
          className={clsx(
            `mt-2 block w-full rounded-lg border-none bg-primary/20 py-1.5 px-3 text-sm/6 text-black`,
            `focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/30`
          )}
        />
      </Field>

      <Field className="mb-5">
        <Label className="text-sm/6 font-medium text-black">Room Number</Label>
        <Input
          data-focus
          className={clsx(
            `mt-2 block w-full rounded-lg border-none bg-primary/20 py-1.5 px-3 text-sm/6 text-black`,
            `focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/30`
          )}
        />
      </Field>
    </>
  );
}

export default ClinicsForm;
