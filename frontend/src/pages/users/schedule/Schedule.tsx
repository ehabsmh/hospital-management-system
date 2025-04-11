import { useEffect, useState } from "react";
import { fetchScheduleData } from "../../../services/apiSchedule";
import ISchedule from "../../../interfaces/Schedule";
import Shifts from "./Shifts";

function Schedule() {
  const [schedule, setSchedule] = useState<ISchedule[] | null>(null);
  const [scheduleError, setScheduleError] = useState("");

  async function getSchedule() {
    try {
      const scheduleData = await fetchScheduleData();
      console.log(scheduleData);
      if (scheduleData) setSchedule(scheduleData);
    } catch (err) {
      if (err instanceof Error) setScheduleError(err.message);
    }
  }

  useEffect(function () {
    getSchedule();
  }, []);

  return (
    <div className="p-6 grid grid-cols-2 gap-8 overflow-auto">
      {schedule?.map((group) => (
        <div key={group._id}>
          <div>
            <h2 className="text-xl font-semibold">{group.groupName}</h2>
            <h4 className="text-sm font-extralight mb-4 text-neutral-400">
              {group.availableDays.join(", ")}
            </h4>
          </div>
          <div className="space-y-4 overflow-auto h-[87vh]">
            <Shifts groupId={group._id} />
          </div>
        </div>
      ))}
    </div>
  );
}

/*

{shiftsByGroup["A"].map((shift) => (
              <div
                key={shift._id}
                className="border rounded-xl p-4 shadow-md bg-white"
              >
                <div className="font-medium text-gray-700">
                  {shift.startTime} - {shift.endTime}
                </div>
                <div className="mt-2 space-y-1">
                  {shift.doctors.map((doc) => (
                    <div
                      key={doc._id}
                      className="text-sm px-3 py-1 bg-blue-100 rounded-md"
                    >
                      {doc.fullName} - {doc.specialty}
                    </div>
                  ))}
                </div>
              </div>
            ))}
*/
export default Schedule;
