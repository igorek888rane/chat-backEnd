import {Router} from "express";
import UserController from "../user/user-controller.js";


export const routerAuth = new Router()

routerAuth.post('/register',UserController.register)
routerAuth.post('/login',UserController.login)