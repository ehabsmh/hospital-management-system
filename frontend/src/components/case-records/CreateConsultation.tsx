import { Button } from "@headlessui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CreateConsultation({ setRecordType, dueDate, onChange }) {
  console.log(dueDate);

  return (
    <div>
      <Calendar
        onChange={onChange}
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
