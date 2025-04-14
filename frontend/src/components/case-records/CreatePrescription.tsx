import { Button } from "@headlessui/react";
import { Table } from "../current-shift/Table";
import { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { UseFormGetValues, UseFormRegister } from "react-hook-form";
import { ICaseRecord } from "./CreateCaseRecord";

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
  const [medicines, setMedicines] = useState(() =>
    !getValues?.().prescription?.length ? [] : getValues?.().prescription
  );

  console.log(getValues());

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
                <tr>
                  <td className="border border-gray-200 ">
                    <input
                      type="text"
                      placeholder="Medicine Name"
                      className="w-full text-sm text-center"
                      {...register(`prescription.${i}.name`)}
                    />
                  </td>
                  <td className="border border-gray-200">
                    <select
                      defaultValue="tablet"
                      className="w-full"
                      {...register(`prescription.${i}.type`)}
                    >
                      <option value="tablet">tablet</option>
                      <option value="syrup">syrup</option>
                      <option value="injection">injection</option>
                      <option value="ointment">ointment</option>
                    </select>
                  </td>
                  <td className="border border-gray-200">
                    <input
                      type="text"
                      {...register(`prescription.${i}.dosage`)}
                      className="w-full text-sm text-center"
                    />
                  </td>
                </tr>
              </Table.Row>
            ))
          }
        />
      </Table>
      <MdAddCircle
        className="text-green-400 mt-2 cursor-pointer"
        size={25}
        onClick={() => {
          console.log();

          if (
            getValues().prescription.at(-1).name === "" ||
            getValues().prescription.at(-1).dosage === ""
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
