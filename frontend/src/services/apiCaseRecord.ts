import axios, { AxiosError } from "axios";
import { ICaseRecord } from "../components/case-records/CreateCaseRecord";

export async function createCaseRecord(payload: ICaseRecord) {
  try {
    const { data } = await axios.post("http://localhost:3000/api/v1/case-record/", payload, { withCredentials: true })
    return data.message;
  } catch (error) {
    if (error instanceof AxiosError) throw new Error(error.message);
  }
}
