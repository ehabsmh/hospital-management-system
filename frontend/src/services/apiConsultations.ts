import axios, { AxiosError } from "axios";

export async function getConsultation(params: { doctorId: string, patientId: string }) {
  try {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/consultations",
      { withCredentials: true, params: { "doctor-id": params.doctorId, "patient-id": params.patientId } }
    );

    return data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.error.message);
  }
}
