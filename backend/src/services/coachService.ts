import CustomError from "../middlewares/customError";
import User from "../models/User";
import { getCoachesQuery } from "../queries/coachQuery";
import { NOT_ALLOWED, USER_NOT_FOUND } from "../utils/errorCodes";

export const getCoachesService = async (
  role: "ADMIN" | "COACH" | "TRAINEE",
  {
    searchString,
    sortBy,
    coachesPerPage,
  }: { searchString: string; sortBy: string; coachesPerPage: number },
) => {
  if (role !== "ADMIN") {
    throw new CustomError(NOT_ALLOWED, "Only admins can view coaches", 403);
  }

  const coaches = await getCoachesQuery(searchString, sortBy, coachesPerPage);
  return coaches;
};

export const updateCoachOrAdminService = async (
  userId: string,
  {
    name,
    email,
    role,
  }: { name: string; email: string; role: "ADMIN" | "COACH" | "TRAINEE" },
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError(USER_NOT_FOUND, "User not found", 404);
  }

  if (name) {
    user.name = name;
  }

  if (email) {
    user.email = email;
  }

  if (role) {
    user.role = role;
  }

  await user.save();
  return user;
};
