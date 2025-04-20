import { AxiosError } from "axios";
import ISchedule from "../interfaces/Schedule";
import api from "../config/axios.config";

export async function fetchScheduleData() {
  try {
    const { data } = await api.get("/api/v1/schedule/", { withCredentials: true });
    const schedule: ISchedule[] = data;
    return schedule;

  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.message);
  }

}
