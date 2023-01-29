import {Sequelize} from "sequelize";
import {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER} from "./procces-variables.js";






export const sequelize = new Sequelize(DB_NAME, DB_USER,DB_PASSWORD, {
        dialect: 'postgres',
        host: DB_HOST,
        port: DB_PORT
    }
)