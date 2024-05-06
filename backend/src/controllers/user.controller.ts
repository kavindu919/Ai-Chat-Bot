import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";

//make function for get all the users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ message: "Sucsess", users });
  } catch (error) {
    console.log(error);
    //casue is use to send error message
    return res
      .status(500)
      .json({ message: "Error!", cause: error.error.message });
  }
};

//make function for the user sign
export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    //cheak already exsists user
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).send("Already exsist user");
    const hasedPassword = await hash(password, 10);
    //make new instanse of the user modal and use it as schema
    const user = new User({ name, email, password: hasedPassword });
    //save the user in db
    await user.save();
    return res
      .status(201)
      .json({ message: "Sucsess add new user", id: user._id.toString() });
  } catch (error) {
    console.log(error);
    //casue is use to send error message
    return res
      .status(200)
      .json({ message: "Error!", cause: error.error.message });
  }
};

//make function for login
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    //cheak if user exsists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not found");
    }
    //cheaking password
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).send("Incorrect Password");
    }
    return res
      .status(200)
      .json({ message: "Succesfully login", id: user._id.toString() });
  } catch (error) {
    console.log(error);
    //casue is use to send error message
    return res
      .status(500)
      .json({ message: "Error!", cause: error.error.message });
  }
};
