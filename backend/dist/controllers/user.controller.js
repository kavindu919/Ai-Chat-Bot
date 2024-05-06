import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token.manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
//make function for get all the users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        return res.status(200).json({ message: "Sucsess", users });
    }
    catch (error) {
        console.log(error);
        //casue is use to send error message
        return res
            .status(500)
            .json({ message: "Error!", cause: error.error.message });
    }
};
//make function for the user sign
export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        //cheak already exsists user
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(401).send("Already exsist user");
        const hasedPassword = await hash(password, 10);
        //make new instanse of the user modal and use it as schema
        const user = new User({ name, email, password: hasedPassword });
        //save the user in db
        await user.save();
        //clear the cookiee if any
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        //make new token
        const token = createToken(user._id.toString(), user.email, "7d");
        //set the cookie
        //make date for expires
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res
            .status(201)
            .json({ message: "Sucsess add new user", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        //casue is use to send error message
        return res
            .status(200)
            .json({ message: "Error!", cause: error.error.message });
    }
};
//make function for login
export const userLogin = async (req, res, next) => {
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
        //clear the cookiee if any
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        //make new token
        const token = createToken(user._id.toString(), user.email, "7d");
        //set the cookie
        //make date for expires
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res
            .status(200)
            .json({ message: "Succesfully login", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        //casue is use to send error message
        return res
            .status(500)
            .json({ message: "Error!", cause: error.error.message });
    }
};
//# sourceMappingURL=user.controller.js.map