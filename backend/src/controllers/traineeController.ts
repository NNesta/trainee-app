import { NextFunction, Response } from "express";
import { editUserSchema } from "../validations/userValidation";
import {
  getTraineesForCoachService,
  getTraineesService,
  updateTraineeService,
} from "../services/traineeService";

export const getTrainees = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const searchString = req.query.searchString || "";
  const traineesPerPage = Number(req.query.coachesPerPage) || 10;
  const sortBy = req.query.sortBy || "entry";
  try {
    const trainees = await getTraineesService({
      searchString,
      sortBy,
      traineesPerPage,
    });
    return res.status(200).json(trainees);
  } catch (error) {
    next(error);
  }
};

export const getTraineesForCoach = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const searchString = req.query.searchString || "";
  const traineesPerPage = Number(req.query.coachesPerPage) || 10;
  const sortBy = req.query.sortBy || "entry";
  try {
    const { id } = req.user;
    const trainees = await getTraineesForCoachService(id, {
      searchString,
      sortBy,
      traineesPerPage,
    });
    return res.status(200).json(trainees);
  } catch (error) {
    next(error);
  }
};

export const updateTrainee = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.id;
    await editUserSchema.validateAsync(req.body);
    const user = await updateTraineeService(userId, req.body);
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
