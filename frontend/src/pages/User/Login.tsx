import React from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/user/apiSlice";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import { H1 } from "../../components/ui/Typography";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import Loader from "../../components/ui/Loader";

const Login = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirectTo") || "/";
  const onSubmit = async (data: any) => {
    const result = await login({ email: data.email, password: data.password });
    if (result?.data?.accessToken) {
      cookies.set("jwt", result.data.accessToken, { maxAge: 1800 });
      return navigate(redirectUrl);
    }
  };

  const errorMessage: any =
    errors.name?.message || errors.email?.message || error?.data?.errorMessage;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-screen justify-center gap-5 md:gap-16 items-center px-5 sm:px-10 md:p-0 max-w-xl mx-auto"
    >
      <H1>Member login</H1>
      {isLoading && <Loader />}
      <div className="space-y-3 md:space-y-6 lg:space-y-10 w-full">
        {errorMessage && (
          <div className="py-2 bg-error-light text-error-dark flex justify-center items-center rounded-lg">
            {errorMessage}
          </div>
        )}
        <InputField
          name="email"
          type="email"
          label="Email address"
          placeholder="example@gmail.com"
          register={register}
          options={{
            required: { value: true, message: "Email is required field" },
          }}
        />
        <InputField
          name="password"
          type="password"
          label="Password"
          placeholder="password"
          register={register}
          options={{
            required: { value: true, message: "Password is required field" },
          }}
        />
      </div>

      <Button>Login</Button>
      <div className="">
        Forgot password?{" "}
        <Link to="/reset-password" className="text-primary-dark">
          Reset
        </Link>
      </div>
    </form>
  );
};

export default Login;
