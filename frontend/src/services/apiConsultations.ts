import { AxiosError } from "axios";
import api from "../config/axios.config";

export async function getConsultation(params: { doctorId: string, patientId: string }) {
  try {
    const { data } = await api.get(
      "/api/v1/consultations",
      { withCredentials: true, params: { "doctor-id": params.doctorId, "patient-id": params.patientId } }
    );

    return data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.message);
  }
}

export async function createConsultation(payload: { patientId: string, dueDate: Date }) {
  try {
    const { data } = await api.post(
      "/api/v1/consultations",
      payload,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) throw new Error(error.response?.data.message);
  }
}
