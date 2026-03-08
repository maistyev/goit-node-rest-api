import HttpError from "../helpers/HttpError.js";
import { verifyToken } from "../helpers/jwtToken.js";

import { findUser } from "../services/authServices.js";

const authenticate = async(req, res, next)=> {
    const authorization = req.get("Authorization");
    if(!authorization) throw HttpError(401, "Authorization header missing");
    const [bearer, token] = authorization.split(" ");
    if(bearer !== "Bearer") throw HttpError(401, "Authorization header must have Bearer type");

    const {data, error} = verifyToken(token);
    if(error) throw HttpError(401, error.message);

    const user = await findUser({id: data.id});
    if(!user || !user.token) throw HttpError(401, "Not authorized");
    req.user = user;
    next();
}

export default authenticate;