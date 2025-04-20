import { AxiosError } from "axios";
import { AccountsFormData } from "../pages/admins/Accounts";
import { IUser } from "../interfaces/User";
import api from "../config/axios.config";

export async function signup(formData: AccountsFormData) {
  try {

    const { data } = await api.post(
      "/api/v1/auth/sign-up", formData, {
      withCredentials: true
    })

    return data.message;

  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.message);
  }
}

export async function logout() {
  try {
    const { data } = await api.post(
      "/api/v1/auth/logout", {}, { withCredentials: true })

    return data.message;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
  }
}

export async function setNewPassword(payload: { password: string, userId: string }) {
  try {
    const { data }: { data: { message: string, user: IUser } } = await api.put(
      `/api/v1/auth/create-password`, payload);

    return data;

  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.message);
  }
}

export async function checkPassword(userId: string) {
  try {
    const { data } = await api.get(
      `/api/v1/auth/check-password/${userId}`);

    return data;

  } catch (err) {
    if (err instanceof AxiosError) throw new Error(err.response?.data.message);
  }
}

export async function uploadAvatar(avatar: File | string) {
  const formData = new FormData();
  formData.append("avatar", avatar);
  const { data }: { data: { message: string, avatarPath: string } } = await api.post('/api/v1/auth/upload-avatar', formData, { withCredentials: true })
  return data

}
