import React from "react";
import {
  useEditTraineeMutation,
  useGetAllCoachesQuery,
} from "../../features/user/apiSlice";
import { useForm } from "react-hook-form";
import ModalLayout from "./ModalLayout";
import Alert from "../ui/Alert";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import Loader from "../ui/Loader";

const EditTraineeModal = ({
  closePopup,
  jwt,
  traineeData,
  role,
}: {
  closePopup: () => void;
  jwt: string;
  traineeData: string[];
  role: "ADMIN" | "COACH";
}) => {
  const [editTrainee, { isLoading, error, isSuccess: isEditTraineeSuccess }] =
    useEditTraineeMutation();
  const query = "?coachesPerPage=100";
  const allCoaches = useGetAllCoachesQuery(
    { jwt, query },
    { skip: role !== "ADMIN" },
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    await editTrainee({ jwt, id: traineeData[0], body: { ...data } });
  };

  const errorMessage: any =
    errors?.name?.message ||
    errors?.email?.message ||
    error?.data?.errorMessage;

  return (
    <ModalLayout closePopup={closePopup} title="Edit trainee">
      {errorMessage && <Alert type="error">{errorMessage}</Alert>}
      {isEditTraineeSuccess && (
        <Alert type="success">Trainee was updated succesfully</Alert>
      )}
      {isLoading && (
        <div className="w-full flex justify-center items-center">
          <Loader />
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-12 w-full"
      >
        <InputField
          type="text"
          label="Name"
          placeholder=""
          name="name"
          defaultValue={traineeData[1]}
          register={register}
          options={{
            required: { value: true, message: "name is required field" },
            maxLength: {
              value: 30,
              message: "Name must not exceed 30 characters",
            },
          }}
        />
        <InputField
          type="email"
          label="Email adress"
          placeholder=""
          name="email"
          defaultValue={traineeData[2]}
          register={register}
          options={{
            required: { value: true, message: "Email is required field" },
          }}
        />
        {role === "ADMIN" && (
          <div className="flex flex-col gap-5">
            <label htmlFor="role" className="text-lg font-medium">
              Assign coach
            </label>

            <select
              className="form-select rounded-xl h-[58px] border-gray-200"
              {...register("coach")}
            >
              {allCoaches.data?.map((coach: any, index: number) => (
                <option
                  key={index}
                  value={coach._id}
                  selected={coach.name === traineeData[3]}
                >
                  {coach.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex gap-2">
          <Button outlined clickHandler={closePopup}>
            Cancel
          </Button>
          <Button>Save</Button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default EditTraineeModal;
