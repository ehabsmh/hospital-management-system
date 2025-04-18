import axios, { AxiosError } from "axios";
import { PatientFormData } from "../components/users/reservations/AddPatient";
import IPatient from "../interfaces/Patient";

export async function fetchPatient(phoneNumber: string) {
  try {
    const { data }: { data: IPatient } = await axios.get(
      "http://localhost:3000/api/v1/patients",
      { withCredentials: true, params: { "phone-number": phoneNumber } }
    );

    return data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.message);
  }
}

export async function addPatient(patient: PatientFormData) {
  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/patients", patient, { withCredentials: true, }
    );

    return data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.message);
  }
}

export async function editPatient(patient: IPatient) {
  try {
    const { data } = await axios.put(
      `http://localhost:3000/api/v1/patients/${patient._id}`, patient, { withCredentials: true, }
    );

    return data.message;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.message);
  }
}
