import axios from "axios";
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
