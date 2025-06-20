import { AxiosError } from "axios";
import ICaseRecord from "../interfaces/CaseRecord";
import api from "../config/axios.config";


export async function createCaseRecord(payload: ICaseRecord) {
  try {
    const { data } = await api.post("/api/v1/case-record/", payload, { withCredentials: true })
    return data.message;
  } catch (error) {
    if (error instanceof AxiosError) throw new Error(error.message);
  }
}

export async function fetchCaseRecords(patientId: string): Promise<ICaseRecord[]> {
  try {
    const { data }: { data: ICaseRecord[] } = await api.get("/api/v1/case-record/", {
      withCredentials: true,
      params: { "patient-id": patientId },
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) throw new Error(error.response?.data.message);
    throw new Error("An unexpected error occurred while fetching the case records.");
  }
}
