import { AxiosError } from "axios";
import IDoctorReservation from "../interfaces/DoctorReservation";
import api from "../config/axios.config";

export async function getDoctorReservations(doctorId: string) {
  try {
    const { data }: { data: IDoctorReservation[] } = await api.get(
      "/api/v1/reservations",
      { withCredentials: true, params: { "doctor-id": doctorId } }
    );

    return data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.error);
  }
}

export async function createReservation({ doctorId, patientId }: { doctorId: string, patientId: string }, reservationTypeId: string = "67e04d65182214fdd7282918") {
  try {
    const { data } = await api.post(
      "/api/v1/reservations", { reservationTypeId },
      { withCredentials: true, params: { "doctor-id": doctorId, "patient-id": patientId } }
    );

    return data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.error);
  }
}


export async function deleteReservation(reservationId: string) {
  try {
    const { data } = await api.delete(
      `/api/v1/reservations/${reservationId}`,
      { withCredentials: true }
    );
    return data.message;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.message);
  }
}
