import axios, { AxiosError } from "axios";

export async function getDoctorReservations(doctorId: string) {
  try {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/reservations",
      { withCredentials: true, params: { "doctor-id": doctorId } }
    );
    console.log(data.data);

    return data.data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.error);
  }
}
