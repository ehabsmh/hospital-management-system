import axios from "axios";
import { AccountsFormData } from "../pages/admins/Accounts";

export async function signup(formData: AccountsFormData) {
  try {

    const { data } = await axios.post(
      "http://localhost:3000/api/v1/auth/sign-up", formData, { withCredentials: true })

    return data.message;

  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        const error = err.response.data.error;
        if (error) throw new Error(error)
      }
    }
  }
}
