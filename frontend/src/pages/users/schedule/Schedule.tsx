import { useEffect, useState } from "react";
import { fetchScheduleData } from "../../../services/apiSchedule";
import ISchedule from "../../../interfaces/Schedule";
import Shifts from "./Shifts";

const shiftsByGroup = {
  A: [
    {
      _id: "shiftId1",
      startTime: "04:00",
      endTime: "08:00",
      doctors: [
        {
          _id: "doc1",
          fullName: "Dr. Ali Hussein",
          specialty: "عيادة الاسنان",
        },
        {
          _id: "doc2",
          fullName: "Dr. Mona Farouk",
          specialty: "عيادة الباطنه",
        },
        {
          _id: "doc3",
          fullName: "Dr. Ehab Hussein",
          specialty: "عيادة العيون",
        },
        {
          _id: "doc4",
          fullName: "+",
          specialty: "عيادة القلب",
        },
        {
          _id: "doc5",
          fullName: "+",
          specialty: "عيادة الصدرية",
        },
        {
          _id: "doc6",
          fullName: "+",
          specialty: "عيادة المخ و الاعصاب",
        },
        {
          _id: "doc7",
          fullName: "+",
          specialty: "عيادة الانف و الاذن",
        },
      ],
    },
    {
      _id: "shiftId1",
      startTime: "08:00",
      endTime: "12:00",
      doctors: [
        {
          _id: "doc1",
          fullName: "Dr. Mosaad Mohamed",
          specialty: "عيادة الاسنان",
        },
        {
          _id: "doc2",
          fullName: "Dr. Mona Farouk",
          specialty: "عيادة الباطنه",
        },
        {
          _id: "doc3",
          fullName: "Dr. Ehab Hussein",
          specialty: "عيادة العيون",
        },
        {
          _id: "doc4",
          fullName: "+",
          specialty: "عيادة القلب",
        },
        {
          _id: "doc5",
          fullName: "+",
          specialty: "عيادة الصدرية",
        },
        {
          _id: "doc6",
          fullName: "+",
          specialty: "عيادة المخ و الاعصاب",
        },
        {
          _id: "doc7",
          fullName: "+",
          specialty: "عيادة الانف و الاذن",
        },
      ],
    },
    {
      _id: "shiftId1",
      startTime: "12:00",
      endTime: "04:00",
      doctors: [
        {
          _id: "doc1",
          fullName: "Dr. Ali Hussein",
          specialty: "عيادة الاسنان",
        },
        {
          _id: "doc2",
          fullName: "Dr. Mona Farouk",
          specialty: "عيادة الباطنه",
        },
        {
          _id: "doc3",
          fullName: "Dr. Ehab Hussein",
          specialty: "عيادة العيون",
        },
        {
          _id: "doc4",
          fullName: "+",
          specialty: "عيادة القلب",
        },
        {
          _id: "doc5",
          fullName: "+",
          specialty: "عيادة الصدرية",
        },
        {
          _id: "doc6",
          fullName: "+",
          specialty: "عيادة المخ و الاعصاب",
        },
        {
          _id: "doc7",
          fullName: "+",
          specialty: "عيادة الانف و الاذن",
        },
      ],
    },
  ],
  B: [
    {
      _id: "shiftId3",
      startTime: "04:00",
      endTime: "08:00",
      doctors: [
        { _id: "doc3", fullName: "Dr. Sara", specialty: "Orthopedics" },
      ],
    },
  ],
};

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
        <div>
          <div>
            <h2 className="text-xl font-semibold">{group.groupName}</h2>
            <h4 className="text-sm font-extralight mb-4 text-neutral-400">
              {group.availableDays.join(", ")}
            </h4>
          </div>
          <div key={group._id} className="space-y-4 overflow-auto h-[87vh]">
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
