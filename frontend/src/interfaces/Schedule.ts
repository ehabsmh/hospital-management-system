interface ISchedule {
  _id: string;
  groupName: string;
  extraDay: boolean;
  availableDays: string[];
}

export default ISchedule
