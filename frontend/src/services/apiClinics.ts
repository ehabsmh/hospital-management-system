import axios, { AxiosError } from "axios";
import IClinic from "../interfaces/Clinic";

export async function fetchClinics() {
  try {
    const { data } = await axios.get("http://localhost:3000/api/v1/clinics/", { withCredentials: true });
    const clinics: IClinic[] = data;
    return clinics;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}

export async function createClinic(payload: IClinic) {
  try {
    const { data } = await axios.post("http://localhost:3000/api/v1/clinics/", payload, { withCredentials: true });
    console.log(data);

    return data.message;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response) {
        const { data } = err.response;
        throw new Error(data.message);
      }
    }
  }
}
