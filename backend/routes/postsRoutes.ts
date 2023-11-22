import {isAuth} from "./authMiddleware";
import express from "express";
import {postsGetMany, postsPostAPost} from "../controllers/postsControllers";
export const postsRoutes = express.Router()

postsRoutes.get('/:page', postsGetMany)

postsRoutes.post('/create', isAuth, postsPostAPost)