import React from "react";
import Cookies from "universal-cookie";
import { H1 } from "../../components/ui/Typography";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import Loader from "../../components/ui/Loader";
import Alert from "../../components/ui/Alert";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../features/user/apiSlice";
import { useForm } from "react-hook-form";

const Profile = () => {
  const [updateProfile, { isLoading, isSuccess, error }] =
    useUpdateProfileMutation();
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");
  const { data } = useGetProfileQuery(jwt);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: {
    email?: string;
    name?: string;
    password?: string;
  }) => {
    const profileData: { email?: string; name?: string; password?: string } =
      {};
    if (data.email) {
      profileData.email = data.email;
    }

    if (data.name) {
      profileData.name = data.name;
    }

    if (data.password) {
      profileData.password = data.password;
    }

    await updateProfile({ jwt, profileData });
  };

  const errorMessage: any =
    errors.name?.message ||
    errors.email?.message ||
    errors.password?.message ||
    error?.data?.errorMessage;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full flex flex-col justify-center gap-5 md:gap-16 items-center px-5 sm:px-10 md:p-0 md:w-2/3 lg:w-2/5 mx-auto"
    >
      {isLoading && <Loader />}
      {isSuccess && <Alert type="success">Profile update successfully</Alert>}
      {errorMessage && <Alert type="error">{errorMessage}</Alert>}
      <div className="w-2/3 ml-auto">
        <H1>Profile settings</H1>
      </div>
      <div className="space-y-3 md:space-y-6 lg:space-y-10 w-full">
        <InputField
          styles="!flex justify-between"
          name="name"
          type="text"
          label="Name"
          placeholder=""
          defaultValue={data?.name}
          register={register}
        />
        <InputField
          styles="!flex justify-between"
          name="email"
          type="email"
          label="Email"
          placeholder=""
          defaultValue={data?.email}
          register={register}
        />
        <InputField
          styles="!flex justify-between"
          name="password"
          type="password"
          label="Password"
          placeholder="password"
          register={register}
        />
      </div>
      <div className="w-2/3 ml-auto">
        <Button>Save</Button>
      </div>
    </form>
  );
};

export default Profile;
