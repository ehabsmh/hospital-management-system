import axios, { AxiosError } from "axios";
import IDoctorReservation from "../interfaces/DoctorReservation";

export async function getDoctorReservations(doctorId: string) {
  try {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/reservations",
      { withCredentials: true, params: { "doctor-id": doctorId } }
    );
    const doctorReservations: IDoctorReservation[] = data.data;
    return doctorReservations;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.error);
  }
}

export async function createReservation({ doctorId, patientId }: { doctorId: string, patientId: string }, reservationTypeId: string = "67e04d65182214fdd7282918") {
  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/reservations", { reservationTypeId },
      { withCredentials: true, params: { "doctor-id": doctorId, "patient-id": patientId } }
    );
    console.log(data.data);

    return data.data;
  } catch (err) {
    console.log(err);
    if (err instanceof AxiosError) throw new Error(err.response?.data.error);
  }
}


export async function deleteReservation(reservationId: string) {
  try {
    const { data } = await axios.delete(
      `http://localhost:3000/api/v1/reservations/${reservationId}`,
      { withCredentials: true }
    );
    console.log(data);
    return data.message;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.error);
  }
}
