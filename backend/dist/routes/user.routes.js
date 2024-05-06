import { Router } from "express";
import { getAllUsers, userLogin, userSignup, } from "../controllers/user.controller.js";
import { loginValidator, signupValidator, validate, } from "../utils/validators.js";
const userRoutes = Router();
//making user routes
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
export default userRoutes;
//# sourceMappingURL=user.routes.js.map