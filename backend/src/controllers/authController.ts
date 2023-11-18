import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import {
  loginService,
  registerService,
  resetPasswordService,
} from "../services/authService";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../validations/authValidation";

dotenv.config();

export const register = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const body = req.body;
    await registerSchema.validateAsync(body);
    const newUser = await registerService(user, body);
    delete newUser.password;
    return res.status(201).send(newUser);
  } catch (error: any) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await loginSchema.validateAsync(req.body);
    const accessToken = await loginService(req.body);
    return res
      .status(200)
      .cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    await resetPasswordSchema.validateAsync(body);
    const password = resetPasswordService(req.body);
    return res.status(200).json({ password });
  } catch (error: any) {
    next(error);
  }
};
