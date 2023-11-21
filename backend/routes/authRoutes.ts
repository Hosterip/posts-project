import express from 'express'
import {genHashSalt} from "../utils/passportUtils";
import passport from "passport";
import {PrismaClient} from "@prisma/client";
import {isAuth} from "./authMiddleware";

const prisma = new PrismaClient();
export const authRoutes = express.Router()

// POST

authRoutes.post('/register', (req, res) => {
    const {username, password} = req.body
    if (!(username.trim() && password.trim())) {
        res.status(400)
        res.end()
        return
    }
    const {hash, salt} = genHashSalt(password)
    prisma.user.create({
        data: {
            username,
            hash,
            salt
        }
    })
        .then(() => {
            console.log('SUCCESS')
            console.log('Registration SUCCESS');
            // Log in the user immediately after registration
            passport.authenticate('local', {
                successRedirect: '/user',
            })(req, res);
        })
        .catch(e => {
            console.error(e)
            res.status(400)
            res.end()
        })
})

authRoutes.post('/login', passport.authenticate('local', {successRedirect: '/user'}))

authRoutes.post('/logout', isAuth, (req, res) => {
    req.logout((err) => {
        if(err) {
            res.status(500)
            res.end()
        } else {
            res.end()
        }
    })
})
