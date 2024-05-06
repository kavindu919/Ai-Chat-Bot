import jwt from "jsonwebtoken";
export const createToken = (id, email, expiresIn) => {
    //this payload is an object
    const payload = { id, email };
    //sign method use to genarate JSON web token paylode means data that include in the token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};
//# sourceMappingURL=token.manager.js.map