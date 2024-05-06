import jwt from "jsonwebtoken";

export const createToken = (id: string, email: string, expiresIn: string) => {
  //this payload is an object
  const payload = { id, email };
  //sign method use to genarate JSON web token paylode means data that include in the token
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};
