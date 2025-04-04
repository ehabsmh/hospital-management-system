import axios, { AxiosError } from "axios";

export async function getDoctorReservations(doctorId: string) {
  try {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/reservations",
      { withCredentials: true, params: { "doctor-id": doctorId } }
    );

    return data.data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.error);
  }
}

export async function createReservation(params: { doctorId: string, patientId: string }, reservationTypeId: string = "67e04d65182214fdd7282918") {
  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/reservations", { reservationTypeId },
      { withCredentials: true, params: { "doctor-id": params.doctorId, "patient-id": params.patientId } }
    );
    console.log(data.data);

    return data.data;
  } catch (err) {
    console.log(err);
    if (err instanceof AxiosError) throw new Error(err.response?.data.error);
  }
}
