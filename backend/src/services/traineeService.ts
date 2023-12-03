import { Types } from "mongoose";
import CustomError from "../middlewares/customError";
import User from "../models/User";
import { USER_NOT_FOUND } from "../utils/errorCodes";
import {
  getTraineesForCoachQuery,
  getTraineesQuery,
} from "../queries/traineesQuery";

export const getTraineesService = async ({
  searchString,
  sortBy,
  traineesPerPage,
}: {
  searchString: string;
  sortBy: string;
  traineesPerPage: number;
}) => {
  const trainees = getTraineesQuery(searchString, sortBy, traineesPerPage);
  return trainees;
};

export const getTraineesForCoachService = async (
  id: string,
  {
    searchString,
    sortBy,
    traineesPerPage,
  }: { searchString: string; sortBy: string; traineesPerPage: number },
) => {
  const coach: any = await User.findById(id);
  const trainees = await getTraineesForCoachQuery(
    coach._id,
    searchString,
    sortBy,
    traineesPerPage,
  );
  return trainees;
};

export const updateTraineeService = async (
  userId: string,
  {
    name,
    coach,
    email,
  }: { name: string; coach: Types.ObjectId; email: string },
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError(USER_NOT_FOUND, "User not found", 404);
  }

  if (name) {
    user.name = name.trim().replace(/\s+/g, " ");
  }

  if (coach) {
    user.coach = coach;
  }

  if (email) {
    user.email = email;
  }

  await user.save();
  return user;
};
