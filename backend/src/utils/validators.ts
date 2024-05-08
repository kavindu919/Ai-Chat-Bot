// import { NextFunction, Request, Response } from "express";
// import { ValidationChain, body, validationResult } from "express-validator";

// export const validate = (validations: ValidationChain[]) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     for (let validation of validations) {
//       const result = await validation.run(req);
//       if (!result.isEmpty()) {
//         break;
//       }
//       const errors = validationResult(req);
//       if (errors.isEmpty()) {
//         return next();
//       }
//       return res.status(422).json({ errors: errors.array() });
//     }
//   };
// };

// //make validation function for singn up
// export const signupValidator = [
//   body("name").notEmpty().withMessage("Name is required"),
//   body("email").trim().isEmail().withMessage("Eamil is required"),
//   body("password")
//     .trim()
//     .isLength({ min: 6 })
//     .withMessage("Password at least contained 6 characters"),
// ];
import { NextFunction, Request, Response } from "express";
import { ValidationChain, body, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
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

//validation for messahe
export const chatCompletionValidator = [
  body("message").notEmpty().withMessage("Message is required"),
];
