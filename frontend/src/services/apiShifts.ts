import { AxiosError } from "axios";
import ICurrentShift from "../interfaces/CurrentShift";
import { IUser } from "../interfaces/User";
import api from "../config/axios.config";

const endpoint = '/api/v1/shifts';

export async function getCurrentShift() {
  try {
    console.log(import.meta.env.VITE_PRODUCTION_BASE_URL);
    const { data }: { data: ICurrentShift } = await api.get(
      `${endpoint}/current`, { withCredentials: true }
    );

    return data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.message);
  }
}

export async function fetchShifts() {
  try {
    const { data } = await api.get("${endpoint}/all", {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.error);
  }
}

export async function fetchDoctorByShift(params: { groupId: string, clinicId: string }, shiftId: string) {
  try {
    const { data }: { data: IUser } = await api.get(
      `${endpoint}/${shiftId}`,
      { withCredentials: true, params: { 'group-id': params.groupId, 'clinic-id': params.clinicId } }
    );

    return data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.message);
  }
}

export async function addDoctorToShift(
  payload: { doctorId: string; groupId: string; shiftId: string }
) {
  try {
    const { data } = await api.post(
      `${endpoint}/`,
      payload,
      { withCredentials: true }
    );

    return data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.message);
  }
}

export async function deleteDoctorFromShift(
  shiftId: string,
  payload: { doctorId: string; groupId: string; }
) {
  try {
    const { data } = await api.delete(
      `${endpoint}/${shiftId}`,
      { withCredentials: true, data: payload }
    );
    return data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.message);
  }
}
