import axios, { AxiosError } from "axios";
import ICurrentShift from "../interfaces/CurrentShift";
import { IUser } from "../interfaces/User";

export async function getCurrentShift() {
  try {
    const { data }: { data: ICurrentShift } = await axios.get(
      "http://localhost:3000/api/v1/shifts/current",
      { withCredentials: true }
    );

    return data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.error);
  }
}

export async function fetchShifts() {
  try {
    const { data } = await axios.get("http://localhost:3000/api/v1/shifts/all", {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.error);
  }
}

export async function fetchDoctorByShift(params: { groupId: string, clinicId: string }, shiftId: string) {
  try {
    const { data }: { data: IUser } = await axios.get(
      `http://localhost:3000/api/v1/shifts/${shiftId}`,
      { withCredentials: true, params: { 'group-id': params.groupId, 'clinic-id': params.clinicId } }
    );

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {

      throw new Error(err.response?.data.error);
    }
  }
}

export async function addDoctorToShift(
  payload: { doctorId: string; groupId: string; shiftId: string }
) {
  try {
    console.log(payload);
    const { data } = await axios.post(
      `http://localhost:3000/api/v1/shifts/`,
      payload,
      { withCredentials: true }
    );
    console.log(data);
    return data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.error);
  }
}

export async function deleteDoctorFromShift(
  shiftId: string,
  payload: { doctorId: string; groupId: string; }
) {
  try {
    const { data } = await axios.delete(
      `http://localhost:3000/api/v1/shifts/${shiftId}`,
      { withCredentials: true, data: payload }
    );
    return data;
  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.error);
  }
}
