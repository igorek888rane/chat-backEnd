import jwt from 'jsonwebtoken';
import {JWT_ACCESS_SECRET} from "../procces-variables.js";


export const checkAuth = (req,res,next)=>{
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_ACCESS_SECRET);

            req.userId = decoded._id;
            next();
        } catch (e) {
            return res.status(403).json({
                message: 'Нет доступа',
            });
        }
    } else {
        return res.status(403).json({
            message: 'Нет доступа',
        });
    }
}
