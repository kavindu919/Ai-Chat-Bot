// import { NextFunction, Request, Response } from "express";
// import { ValidationChain, body, validationResult } from "express-validator";
import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                const errors = validationResult(req);
                return res.status(422).json({ errors: errors.array() });
            }
        }
        next();
    };
};
//make validation function for login
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters"),
];
//make validation function for sign up
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
];
//# sourceMappingURL=validators.js.map