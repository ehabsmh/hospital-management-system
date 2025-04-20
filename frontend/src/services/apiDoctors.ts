import { AxiosError } from "axios";
import { IUser } from "../interfaces/User";
import api from "../config/axios.config";

export async function fetchDoctorsByClinicId(clinicId: string) {
  try {
    const { data }: { data: IUser[] } = await api.get(
      `/api/v1/doctors/`,
      { withCredentials: true, params: { "clinic-id": clinicId } }
    );
    return data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.message);
  }
}
