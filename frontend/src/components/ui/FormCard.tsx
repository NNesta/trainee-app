import React from "react";
import { H2, H6, H7 } from "./Typography";
import { IFormType } from "../../utils/types";
import Delete from "../../assets/Delete";
import Edit from "../../assets/Edit";
import Cookies from "universal-cookie";
import { useDeleteFormMutation } from "../../features/user/apiSlice";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const FormCard = ({ form }: { form: IFormType }) => {
  const navigate = useNavigate();
  const questions = form.questions;
  const cookie = new Cookies();
  const jwt = cookie.get("jwt");
  const [deleteForm, { isLoading: isDeleteFormLoading }] =
    useDeleteFormMutation();
  const handleDeleteForm = async (id: string) => {
    await deleteForm({ jwt, id });
  };

  return (
    <div className="p-8 custom-shadow flex items-center justify-between rounded-xl">
      {isDeleteFormLoading && (
        <div className="absolute inset-0 h-full w-full">
          <Loader />
        </div>
      )}
      <div
        onClick={() => navigate(`/forms/${form._id}`)}
        className="flex flex-col gap-4 cursor-pointer"
      >
        <H2>{form.title}</H2>
        <H6>{form.description}</H6>
        <div className="flex items-center gap-1">
          <H7>{questions.length}</H7>
          <H7>{questions.length === 1 ? "Question" : "Questions"}</H7>
        </div>
      </div>
      <div className="flex  gap-6">
        <button className="flex items-center gap-2">
          <Edit />
        </button>
        <button
          onClick={() => handleDeleteForm(form._id)}
          className="flex items-center gap-2"
        >
          <Delete />
        </button>
      </div>
    </div>
  );
};

export default FormCard;
