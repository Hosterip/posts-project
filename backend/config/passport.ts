import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import {validPassword} from '../utils/passportUtils'
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

passport.serializeUser((user: any, done) => {
    done(null, user.id)
})

passport.deserializeUser((id: number, done) => {
    prisma.user.findUnique({
        where: {
            id
        }
    })
        .then(user => {
            done(null, user)
        })
        .catch(e => {
            console.error()
            done(e)
        })
})

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, done) => {
    prisma.user.findUnique({
        where: {
            username
        }
    })
        .then(user => {
            console.log(user)
            if(!user) { return done(null, false) }

            const isValid = validPassword(password, user.hash, user.salt)

            if(isValid) {
                done(null, user)
            } else {
                done(null, false)
            }
        })
        .catch(e => {
            done(e)
        })
}))

