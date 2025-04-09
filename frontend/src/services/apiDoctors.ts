import axios, { AxiosError } from "axios";
import { IUser } from "../interfaces/User";

export async function fetchDoctorsByClinicId(clinicId: string) {
  try {
    const { data }: { data: IUser[] } = await axios.get(
      `http://localhost:3000/api/v1/doctors/`,
      { withCredentials: true, params: { "clinic-id": clinicId } }
    );
    return data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.error);
  }
}
