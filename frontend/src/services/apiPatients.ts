import axios, { AxiosError } from "axios";
import { PatientFormData } from "../components/users/reservations/AddPatient";

export async function getPatient(phoneNumber: string) {
  try {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/patients",
      { withCredentials: true, params: { "phone-number": phoneNumber } }
    );
    console.log(data.data);

    return data.data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.message);
  }
}

export async function addPatient(patient: PatientFormData) {
  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/patients", patient, { withCredentials: true, }
    );
    console.log(data.data);

    return data.data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.message);
  }
}

