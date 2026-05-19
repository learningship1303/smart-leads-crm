import {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

// CUSTOM REQUEST TYPE
interface AuthRequest
  extends Request {

  user?: any;

}

// PROTECT ROUTE
export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  try {

    let token;

    // CHECK TOKEN
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {

      token =
        req.headers.authorization.split(
          " "
        )[1];

    }

    // NO TOKEN
    if (!token) {

      return res.status(401).json({
        message:
          "Not authorized, no token",
      });

    }

    // VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    // SAVE USER
    req.user = decoded;

    next();

  } catch (error) {

    console.log(error);

    res.status(401).json({
      message:
        "Not authorized, token failed",
    });

  }

};

// ADMIN ONLY
export const adminOnly = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  try {

    if (
      req.user &&
      req.user.role === "admin"
    ) {

      next();

    } else {

      return res.status(403).json({
        message:
          "Admin access only",
      });

    }

  } catch (error) {

    console.log(error);

    res.status(403).json({
      message:
        "Access denied",
    });

  }

};