import LoginForm from "../../components/auth/LoginForm";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useAuth } from "../../components/auth/useAuth";
import { useNavigate } from "react-router-dom";
import FormAccounts from "../../ui/FormAccounts";
import api from "../../config/axios.config";

export type FormData = {
  email: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { setUser } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (formData) => {
    setIsLoading(true);
    try {
      const { data } = await api.post("/api/v1/auth/sign-in", formData, {
        withCredentials: true,
      });

      setError("");
      setUser(data.user);
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          const error = err.response.data;
          if (error.error) setError(error.error.message);
          else setError(error.message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <FormAccounts layerBgColor="bg-black/75">
      <LoginForm
        register={register}
        onSubmit={onSubmit}
        errors={errors}
        error={error}
        isLoading={isLoading}
      />
    </FormAccounts>
  );
}

export default Login;
