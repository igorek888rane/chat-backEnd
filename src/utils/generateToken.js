import jwt from "jsonwebtoken";
import {JWT_ACCESS_SECRET} from "../procces-variables.js";

export const generateToken = (id) => {
    return jwt.sign({
        _id: id
    },JWT_ACCESS_SECRET, {expiresIn: '30d'})
}