/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";

import CustomError from "./customError";
interface ErrorObject {
  message: string;
  kind: string;
  keyValue: any;
  code: number;
  name: string;
  details?: any;
  statusCode: number;
  errorCode: number | string;
}

const handleValidationError = (error: ErrorObject, res: Response) => {
  return res.status(400).json({
    type: "ValidationError",
    errorMessage: error.details[0].message,
  });
};

const handleNotFoundError = (error: ErrorObject, res: Response) => {
  return res.status(404).json({
    type: "NotFoundError",
    errorMessage: error.details,
  });
};

const handleDuplicateError = (error: ErrorObject, res: Response) => {
  return res.status(400).json({
    type: "DuplicateError",
    errorMessage: `duplicate ${Object.keys(error.keyValue)}`,
  });
};

const handleObjectIdError = (error: ErrorObject, res: Response) => {
  return res.status(400).json({
    type: "InvalidDocumentId",
    errorMessage: error.message,
  });
};

const handleCustomError = (error: ErrorObject, res: Response) => {
  return res.status(error.statusCode).json({
    type: error.errorCode,
    errorMessage: error.message,
  });
};

const handleServerError = (res: Response) => {
  res.status(500).json({
    type: "ServerError",
    errorMessage: "Something Went Wrong. Our team is working on it",
  });
};

export const errorHandler = (
  error: ErrorObject,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  switch (true) {
    case error.name === "ValidationError":
      handleValidationError(error, res);
      break;
    case error.name === "NotFoundError":
      handleNotFoundError(error, res);
      break;
    case error.code === 11000:
      handleDuplicateError(error, res);
      break;
    case error.kind == "ObjectId":
      handleObjectIdError(error, res);
      break;
    case error instanceof CustomError:
      handleCustomError(error, res);
      break;
    default:
      handleServerError(res);
  }
};
