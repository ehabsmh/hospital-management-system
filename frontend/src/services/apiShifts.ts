import axios, { AxiosError } from "axios";
import ICurrentShift from "../interfaces/CurrentShift";

export async function getCurrentShift() {
  try {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/shifts/current",
      { withCredentials: true }
    );

    const currentShift: ICurrentShift = data.data;
    return currentShift;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.error);
  }
}
