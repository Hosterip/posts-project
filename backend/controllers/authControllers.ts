import {genHashSalt} from "../utils/passportUtils";
import passport from "passport";
import {PrismaClient} from "@prisma/client";
import {Request, Response} from 'express'
const prisma = new PrismaClient();


export function authRegisterUser (req: Request, res: Response) {
    const {username, password} = req.body
    if (!(username.trim() && password.trim())) {
        res.status(400)
        res.end()
        return
    }
    const {hash, salt} = genHashSalt(password)
    prisma.user.create({
        data: {
            username: username.toLowerCase(),
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
}

export function authLogout (req: Request, res: Response) {
    req.logout((err) => {
        if(err) {
            res.status(500)
            res.end()
        } else {
            res.end()
        }
    })
}