import {PrismaSessionStore} from '@quixo3/prisma-session-store'
import {PrismaClient} from 'prisma/prisma-client'
import cors from 'cors';
import passport from "passport";
import express from 'express'
import session from 'express-session';
import {authRoutes} from "./routes/authRoutes";
import cookieParser from 'cookie-parser'
import {postsRoutes} from "./routes/postsRoutes";
import {userRoutes} from "./routes/userRoutes";
const app = express()

app.use(cookieParser('a santa at nasa'))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(
    session({
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // ms
        },
        secret: 'a santa at nasa',
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(
            new PrismaClient(),
            {
                checkPeriod: 2 * 60 * 1000,  //ms
                dbRecordIdIsSessionId: true,
                dbRecordIdFunction: undefined,
            }
        ),
    })
);


// PassportJS init

require('./config/passport')

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    console.log(req.session)
    console.log('USER',req.user)
    next()
})


// Router

app.use(authRoutes)

app.use('/posts', postsRoutes)

app.use('/user', userRoutes)

// Start of the server

app.listen(5000)