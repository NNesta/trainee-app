import React from "react";
import { Form, Link, redirect, useNavigation, ActionFunction, useActionData } from "react-router-dom";
import { login } from "../services/api";
import Cookies from "universal-cookie";
import { H1 } from "../components/ui/Typography";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import Loader from "../components/ui/Loader";
import { loginSchema } from "../validations/userValidation";
import Alert from "../components/ui/Alert";

export const action:ActionFunction = async ({ request }) => {
  try{
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  await loginSchema.validate({email, password})
  const cookies = new Cookies();
  const response = await login({ email, password });
  const pathName = new URL(request.url).searchParams.get("redirectTo") || "/";
  if (response.status === 200) {
    const accessToken = response.accessToken;
    cookies.set("jwt", accessToken);
    return redirect(pathName);
  }
  return response;
}
catch(error){
  return error
}
};

const Login = () => {
  const error: any = useActionData()
  const navigation = useNavigation();
  return (
    <Form
      method="post"
      replace
      className="flex flex-col h-screen justify-center gap-5 md:gap-16 items-center px-6 md:px-12 max-w-xl mx-auto"
    >
      <H1>Member login</H1>
      {navigation.state === "submitting" && <Loader />}
      <div className="space-y-3 md:space-y-6 lg:space-y-10 w-full">
      {error && <Alert type="error">{error.message||"failed to login"}</Alert>}
        <InputField
          name="email"
          type="email"
          label="Email address"
          placeholder="example@gmail.com"
        />
        <InputField
          name="password"
          type="password"
          label="Password"
          placeholder="password"
        />
      </div>

      <Button>Login</Button>
      <div className="">
        Forgot password?{" "}
        <Link to="/reset-password" className="text-primary-dark">
          Reset
        </Link>
      </div>
    </Form>
  );
};

export default Login;