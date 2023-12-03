import { compare, hash } from "bcryptjs";
import CustomError from "../middlewares/customError";
import {
  INVALID_CREDENTIAL,
  NOT_ALLOWED,
  USER_NOT_FOUND,
} from "../utils/errorCodes";
import {
  generateRandomPassword,
  generateResetPasswordMessage,
  sendEmail,
} from "../utils/helpers";
import User from "../models/User";
import { ACCESS_TOKEN_EXPIRATION, secret } from "../constants";
import jwt from "jsonwebtoken";

export const registerService = async (user: any, body: any) => {
  let newUser;
  if (user.role !== "ADMIN") {
    throw new CustomError(NOT_ALLOWED, "Only admins can register users", 403);
  }

  let password: string = "";
  const name = body.name.trim().replace(/\s+/g, " "); // Remove unnecesary extra spaces in names
  if (body.role === "COACH" || body.role === "ADMIN") {
    password = generateRandomPassword(10);
    const hashedPassword = await hash(password, 10);
    newUser = {
      ...body,
      name,
      password: hashedPassword,
    };
  } else {
    newUser = { ...body, name };
  }

  const createdUser = await User.create(newUser);
  if (createdUser) {
    await sendEmail(
      createdUser.name,
      createdUser.email,
      createdUser.role,
      password,
    );
  }

  return createdUser;
};

export const loginService = async (body: any) => {
  const { email, password } = body;
  const user: any = await User.findOne({ email });
  if (!user) {
    throw new CustomError(USER_NOT_FOUND, "User not found", 404);
  }

  if (user.role === "TRAINEE") {
    throw new CustomError(
      NOT_ALLOWED,
      "Trainees are not allowed to login yet",
      409,
    );
  }

  const match = await compare(password, user.password);
  if (!match) {
    throw new CustomError(INVALID_CREDENTIAL, "Invalid credential", 401);
  }

  const accessToken = jwt.sign(
    { id: user._id, name: user.name, email: user.email, role: user.role },
    secret,
    {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    },
  );
  return accessToken;
};

export const resetPasswordService = async (body: any) => {
  const { email } = body;
  const user: any = await User.findOne({ email });
  if (!user) {
    throw new CustomError(USER_NOT_FOUND, "User not found", 404);
  }

  const password = generateRandomPassword(10);
  const hashedPassword = await hash(password, 10);
  user.password = hashedPassword;
  await user.save();
  await sendEmail(
    user.name,
    user.email,
    "Hello " + user.name,
    generateResetPasswordMessage(user.name, password),
  );
  return password;
};
