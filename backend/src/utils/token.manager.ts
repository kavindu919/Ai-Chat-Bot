import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, expiresIn: string) => {
  //this payload is an object
  const payload = { id, email };
  //sign method use to genarate JSON web token paylode means data that include in the token
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};

//function for veryfy the token
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token not recived" });
  }
  return new Promise<void>((reslove, reject) => {
    //verify the token
    return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token expired" });
      } else {
        console.log("Token validation Successfull");
        reslove();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
};
