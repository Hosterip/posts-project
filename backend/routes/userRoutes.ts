import {isAuth} from "./authMiddleware";
import express from "express";
import {getManyUsers, getUser, getUserById} from "../controllers/userControllers";

export const userRoutes = express.Router()

userRoutes.get('/', isAuth, getUser)

userRoutes.get('/many/:page', getManyUsers)

userRoutes.get('/:id', getUserById)