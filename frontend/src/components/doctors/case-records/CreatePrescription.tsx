import { Button } from "@headlessui/react";
import { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { UseFormGetValues, UseFormRegister } from "react-hook-form";
import { Table } from "../../../ui/Table";
import ICaseRecord from "../../../interfaces/CaseRecord";

type CreatePrescriptionProps = {
  register: UseFormRegister<ICaseRecord>;
  setRecordType: React.Dispatch<React.SetStateAction<string>>;
  getValues: UseFormGetValues<ICaseRecord>;
};

function CreatePrescription({
  setRecordType,
  register,
  getValues,
}: CreatePrescriptionProps) {
  const [medicines, setMedicines] = useState<ICaseRecord["prescription"]>(() =>
    !getValues?.().prescription?.length ? [] : getValues?.().prescription
  );

  return (
    <>
      <Table>
        <Table.Header>
          <Table.Columns headers={["Name", "Type", "Dosage"]} />
        </Table.Header>
        <Table.Body
          render={() =>
            medicines.map((_, i) => (
              <Table.Row key={i}>
                <td className="dark:text-white border border-gray-200 ">
                  <input
                    type="text"
                    placeholder="Medicine Name"
                    className="w-full text-sm text-center dark:focus:outline-none"
                    {...register(`prescription.${i}.name`)}
                  />
                </td>
                <td className="dark:text-white border border-gray-200">
                  <select
                    defaultValue="tablet"
                    className="w-full text-center dark:focus:outline-none"
                    {...register(`prescription.${i}.type`)}
                  >
                    <option className="dark:text-black" value="tablet">
                      tablet
                    </option>
                    <option className="dark:text-black" value="syrup">
                      syrup
                    </option>
                    <option className="dark:text-black" value="injection">
                      injection
                    </option>
                    <option className="dark:text-black" value="ointment">
                      ointment
                    </option>
                  </select>
                </td>
                <td className="dark:text-white border border-gray-200">
                  <input
                    type="text"
                    placeholder="Dosage"
                    {...register(`prescription.${i}.dosage`)}
                    className="w-full text-sm text-center dark:focus:outline-none"
                  />
                </td>
              </Table.Row>
            ))
          }
        />
      </Table>
      <MdAddCircle
        className="text-green-400 mt-2 cursor-pointer"
        size={25}
        onClick={() => {
          console.log(getValues());

          if (
            getValues().prescription?.at(-1)?.name === "" ||
            getValues().prescription?.at(-1)?.dosage === ""
          )
            return;
          setMedicines((medicines) => [
            ...medicines,
            { name: "", type: "", dosage: "" },
          ]);
        }}
      />
      <div className="w-full flex justify-between">
        <Button
          onClick={() => setRecordType("Report")}
          type="button"
          className="mt-3 shadow-md rounded-lg border-none py-1.5 px-7 text-sm/6 text-white bg-primary data-[disabled]:bg-primary/50 duration-300  data-[hover]:bg-sky-600 cursor-pointer data-[active]:bg-sky-700"
        >
          Back
        </Button>
        <Button
          onClick={() => setRecordType("Consultation")}
          type="button"
          className="mt-3 shadow-md rounded-lg border-none py-1.5 px-7 text-sm/6 text-white bg-primary data-[disabled]:bg-primary/50 duration-300  data-[hover]:bg-sky-600 cursor-pointer data-[active]:bg-sky-700"
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default CreatePrescription;
