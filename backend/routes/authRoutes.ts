import express from 'express'
import passport from "passport";
import {isAuth} from "./authMiddleware";
import {authLogout, authRegisterUser} from "../controllers/authControllers";

export const authRoutes = express.Router()

authRoutes.post('/register', authRegisterUser)

authRoutes.post('/login', passport.authenticate('local', {successRedirect: '/user'}))

authRoutes.post('/logout', isAuth, authLogout)
