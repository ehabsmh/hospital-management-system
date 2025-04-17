import axios, { AxiosError } from "axios";
import ISchedule from "../interfaces/Schedule";

export async function fetchScheduleData() {
  try {
    const { data } = await axios.get("http://localhost:3000/api/v1/schedule/", { withCredentials: true });
    const schedule: ISchedule[] = data;
    return schedule;

  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.message);
  }

}
