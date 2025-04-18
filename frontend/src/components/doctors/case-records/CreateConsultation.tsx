import { Button } from "@headlessui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type CreateConsultationProps = {
  setRecordType: React.Dispatch<React.SetStateAction<string>>;
  dueDate: Date;
  onChange: React.Dispatch<React.SetStateAction<Date>>;
};
function CreateConsultation({
  setRecordType,
  dueDate,
  onChange,
}: CreateConsultationProps) {
  console.log(dueDate);

  return (
    <div>
      <Calendar
        onChange={(value) => {
          if (value instanceof Date) {
            onChange(value);
          }
        }}
        value={dueDate}
        calendarType="islamic"
        minDate={new Date()}
      />
      <div className="w-full flex justify-between">
        <Button
          onClick={() => setRecordType("Prescription")}
          type="button"
          className="mt-3 shadow-md rounded-lg border-none py-1.5 px-7 text-sm/6 text-white bg-primary data-[disabled]:bg-primary/50 duration-300  data-[hover]:bg-sky-600 cursor-pointer data-[active]:bg-sky-700"
        >
          Back
        </Button>
        <Button
          type="submit"
          className="mt-3 shadow-md rounded-lg border-none py-1.5 px-7 text-sm/6 text-white bg-primary data-[disabled]:bg-primary/50 duration-300  data-[hover]:bg-sky-600 cursor-pointer data-[active]:bg-sky-700"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default CreateConsultation;
