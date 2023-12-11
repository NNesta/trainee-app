// import { ObjectId } from "mongodb";
import Form from "../models/Form";
import { FormType } from "../utils/types";

export const getFormsQuery = async (searchString: string) => {
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

export const getFormQuery = async (formId: string) => {
  const forms: any = await Form.findById(formId).populate("questionsId").exec();
  return forms;
};
