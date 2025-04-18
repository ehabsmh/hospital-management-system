import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";
import CreateReport from "./CreateReport";
import CreatePrescription from "./CreatePrescription";
import { useForm } from "react-hook-form";
import { createCaseRecord } from "../../../services/apiCaseRecord";
import CreateConsultation from "./CreateConsultation";
import { createConsultation } from "../../../services/apiConsultations";
import { toast } from "sonner";
import { MdClose } from "react-icons/md";
import useDeleteReservation from "../../users/reservations/useDeleteReservation";
import ICaseRecord from "../../../interfaces/CaseRecord";

type Value = Date;
type CreateCaseRecordProps = {
  patientId: string;
  onCloseModal?: () => void;
  reservationId: string;
};

function CreateCaseRecord({
  patientId,
  onCloseModal,
  reservationId,
}: CreateCaseRecordProps) {
  const [recordType, setRecordType] = useState("Report");
  const [dueDate, onChangeDueDate] = useState<Value>(new Date());
  const { delReservation } = useDeleteReservation();

  const { register, handleSubmit, getValues, setValue } =
    useForm<ICaseRecord>();

  useEffect(
    function () {
      setValue("patientId", patientId);
    },
    [patientId, setValue]
  );

  async function onSubmit(data: ICaseRecord) {
    try {
      const message = await createCaseRecord(data);

      const consultation = await createConsultation({ patientId, dueDate });
      console.log(message);
      console.log(consultation);
      onCloseModal?.();
      toast.success(`Record created for case #${patientId}.`);
      delReservation(reservationId);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }

  return (
    <section className="border relative rounded-md border-white/20  w-1/2 p-10 shadow-lg shadow-black/70">
      <MdClose
        onClick={(e) => {
          onCloseModal?.();
          e.stopPropagation();
        }}
        className="absolute top-0 right-0 border border-gray-300 cursor-pointer"
        size={25}
      />
      <div className="flex justify-center gap-8">
        <Button
          disabled={recordType !== "Report"}
          className="mt-3 shadow-md rounded-lg border-none py-1.5 px-3 text-sm/6 text-white bg-primary data-[disabled]:bg-primary/50 duration-300  data-[hover]:bg-sky-600 cursor-pointer data-[active]:bg-sky-700"
        >
          Report
        </Button>
        <Button
          disabled={recordType !== "Prescription"}
          className="mt-3 shadow-md rounded-lg border-none py-1.5 px-3 text-sm/6 text-white bg-primary data-[disabled]:bg-primary/50 duration-300  data-[hover]:bg-sky-600 cursor-pointer data-[active]:bg-sky-700"
        >
          Prescription
        </Button>
        <Button
          disabled={recordType !== "Consultation"}
          className="mt-3 shadow-md rounded-lg border-none py-1.5 px-3 text-sm/6 text-white bg-primary data-[disabled]:bg-primary/50 duration-300  data-[hover]:bg-sky-600 cursor-pointer data-[active]:bg-sky-700"
        >
          Consultation
        </Button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center flex-col"
      >
        <div className="w-1/2">
          {recordType === "Report" && (
            <CreateReport setRecordType={setRecordType} register={register} />
          )}
        </div>
        {recordType === "Prescription" && (
          <CreatePrescription
            setRecordType={setRecordType}
            register={register}
            getValues={getValues}
          />
        )}
        {recordType === "Consultation" && (
          <CreateConsultation
            setRecordType={setRecordType}
            dueDate={dueDate}
            onChange={onChangeDueDate}
          />
        )}
      </form>
    </section>
  );
}

export default CreateCaseRecord;
