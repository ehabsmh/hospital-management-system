import LoginForm from "../../components/auth/LoginForm";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/auth/useAuth";
import { useNavigate } from "react-router-dom";
import FormAccounts from "../../ui/FormAccounts";
import api from "../../config/axios.config";
import { toast } from "sonner";

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

  useEffect(function () {
    toast.info("You can use the default admin's account to try the system.");
  }, []);

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
