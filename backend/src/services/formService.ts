/* eslint-disable no-useless-catch */
import CustomError from "../middlewares/customError";
import Form from "../models/Form";
import Question from "../models/Question";
import { FORM_NOT_FOUND, INVALID_MONGODB_ID } from "../utils/errorCodes";
import { CreateFormType, FormType } from "../utils/types";
import mongoose from "mongoose";
const { Types } = mongoose;
const { ObjectId } = Types;

export const getFormsService = async (searchString: string) => {
  const forms: FormType[] = await Form.aggregate([
    {
      $match: { title: { $regex: new RegExp(searchString, "i") } },
    },
    {
      $lookup: {
        from: "questions",
        localField: "questionsId",
        foreignField: "_id",
        as: "questions",
      },
    },
    {
      $project: {
        title: 1,
        description: 1,
        questions: 1,
      },
    },
  ]);
  return forms;
};

export const updateFormService = async (
  formId: string,
  formData: CreateFormType,
) => {
  const { title, description } = formData;
  if (!ObjectId.isValid(formId)) {
    throw new CustomError(INVALID_MONGODB_ID, "Invalide Document ID", 400);
  }

  const form = await Form.findById(formId);
  if (!form) {
    throw new CustomError(FORM_NOT_FOUND, "Form not found", 404);
  }

  if (title) {
    form.title = title;
  }

  if (description) {
    form.description = description;
  }

  await form.save();
  return form;
};

export const createFormService = async (formData: CreateFormType) => {
  const { title, description } = formData;
  const createdForm = await Form.create({ title, description });
  return createdForm;
};

export const getSingleFormService = async (formId: string) => {
  if (!ObjectId.isValid(formId)) {
    throw new CustomError(INVALID_MONGODB_ID, "Invalide Document ID", 400);
  }

  const form = await Form.findById(formId);
  if (form === null) {
    throw new CustomError(FORM_NOT_FOUND, "Form not found", 404);
  }

  return form;
};

export const deleteFormService = async (formId: string) => {
  if (!ObjectId.isValid(formId)) {
    throw new CustomError(INVALID_MONGODB_ID, "Invalide Document ID", 400);
  }

  const form = await Form.findByIdAndDelete(formId);
  if (!form) {
    throw new CustomError(FORM_NOT_FOUND, "Form not found", 404);
  }

  await Question.deleteMany({ _id: { $in: form.questionsId } });
  return true;
};
