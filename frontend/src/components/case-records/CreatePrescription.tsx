import { Button } from "@headlessui/react";
import { Table } from "../current-shift/Table";
import { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { UseFormGetValues, UseFormRegister } from "react-hook-form";
import { ICaseRecord } from "./CreateCaseRecord";

type CreatePrescProps = {
  register: UseFormRegister<ICaseRecord>;
  setRecordType: React.Dispatch<React.SetStateAction<string>>;
  getValues: UseFormGetValues<ICaseRecord>;
};

function CreatePrescription({
  setRecordType,
  register,
  getValues,
}: CreatePrescProps) {
  const [medicines, setMedicines] = useState(() =>
    !getValues?.().prescription?.length
      ? [{ name: "", type: "", dosage: "" }]
      : getValues?.().prescription
  );
  console.log(getValues?.());
  return (
    <>
      <Table>
        <Table.Header>
          <Table.Columns headers={["Name", "Type", "Dosage"]} />
        </Table.Header>
        <Table.Body
          render={() =>
            medicines.map((medicine, i) => (
              <Table.Row key={i}>
                <td className="border border-gray-200 ">
                  <input
                    type="text"
                    className="w-full text-sm text-center"
                    {...register(`prescription.${i}.name`)}
                  />
                </td>
                <td className="border border-gray-200">
                  <input
                    type="text"
                    {...register(`prescription.${i}.type`)}
                    className="w-full text-sm text-center"
                  />
                </td>
                <td className="border border-gray-200">
                  <input
                    type="text"
                    {...register(`prescription.${i}.dosage`)}
                    className="w-full text-sm text-center"
                  />
                </td>
              </Table.Row>
            ))
          }
        />
      </Table>
      <MdAddCircle
        className="text-green-400 mt-2"
        size={25}
        onClick={() =>
          setMedicines((medicines) => [
            ...medicines,
            { name: "", type: "", dosage: "" },
          ])
        }
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
