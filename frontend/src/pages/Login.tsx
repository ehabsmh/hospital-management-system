import styled from "styled-components";
import LoginForm from "../components/auth/LoginForm";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";

export type FormData = {
  email: string;
  password: string;
};

const LoginSection = styled.section`
  background-image: url("/images/login-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 75% 25%;
`;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/auth/sign-in",
        formData
      );
      console.log(data);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          const error = err.response.data;
          console.error(error.message);
        }
      }
    }
  });

  return (
    <LoginSection className="h-screen bg-dark">
      <div className="layer h-full bg-black/75">
        <div className="container h-full lg:w-1/2 mx-auto flex justify-center items-center">
          <LoginForm register={register} onSubmit={onSubmit} errors={errors} />
        </div>
      </div>
    </LoginSection>
  );
}

export default Login;
