import jwt from "jsonwebtoken";
import {JWT_ACCESS_SECRET} from "../procces-variables.js";

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id
    },JWT_ACCESS_SECRET, {expiresIn: '30d'})
}