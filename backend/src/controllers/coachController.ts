import { NextFunction, Response } from "express";
import { editUserSchema } from "../validations/userValidation";
import {
  getCoachesService,
  updateCoachOrAdminService,
} from "../services/coachService";

export const getCoaches = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { role } = req.user;
    const searchString = req.query.searchString || "";
    const coachesPerPage = Number(req.query.coachesPerPage) || 10;
    const sortBy = req.query.sortBy || "entry";
    const coaches = await getCoachesService(role, {
      searchString,
      coachesPerPage,
      sortBy,
    });
    return res.status(200).json(coaches);
  } catch (error) {
    next(error);
  }
};

export const updateCoachOrAdmin = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.id;
    await editUserSchema.validateAsync(req.body);
    const user = await updateCoachOrAdminService(userId, req.body);
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
