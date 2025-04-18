import { useEffect, useState } from "react";
import { fetchScheduleData } from "../../../services/apiSchedule";
import ISchedule from "../../../interfaces/Schedule";
import Shifts from "../../../components/users/schedule/Shifts";

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
    <div className="md:p-6 md:grid md:grid-cols-2 md:gap-8 overflow-auto">
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

export default Schedule;
