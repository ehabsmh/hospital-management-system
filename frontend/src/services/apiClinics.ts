import axios, { AxiosError } from "axios";
import IClinic from "../interfaces/Clinic";

export async function fetchClinics() {
  try {
    const { data }: { data: IClinic[] } = await axios.get("http://localhost:3000/api/v1/clinics/", { withCredentials: true });
    return data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.message);
  }
}

export async function createClinic(payload: IClinic) {
  try {
    const { data } = await axios.post("http://localhost:3000/api/v1/clinics/", payload, { withCredentials: true });

    return data.message;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.message);
  }
}
