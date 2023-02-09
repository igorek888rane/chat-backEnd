import * as dotenv from "dotenv";

dotenv.config()



export const PORT = process.env.PORT || 5000
export const DB_URI = process.env.DB_URI
export const DB_NAME = process.env.DB_NAME
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD= process.env.DB_PASSWORD
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET