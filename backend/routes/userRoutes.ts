import {isAuth} from "./authMiddleware";
import express from "express";

export const userRoutes = express.Router()

userRoutes.get('/', isAuth, (req, res) => {
    console.log('USER', req.user)
    // @ts-ignore
    const {username, id} = req.user
    res.send({username, id})
})
