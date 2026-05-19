import {
  Request,
  Response,
  NextFunction,
} from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  console.log(err);

  res.status(
    err.status || 500
  ).json({

    success: false,

    message:
      err.message ||
      "Server Error",

  });

};