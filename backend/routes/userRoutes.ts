import {isAuth} from "./authMiddleware";
import express from "express";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export const userRoutes = express.Router()

userRoutes.get('/', isAuth, (req, res) => {
    console.log('USER', req.user)
    // @ts-ignore
    const {username, id} = req.user
    res.send({username, id})
})

userRoutes.get('/many/:page', async (req, res) => {
    const page = +req.params.page
    const limit = req.query.limit ? +req.query.limit : 10
    const query = req.query.q
    const skip = page === 0 ? 0 : (page - 1) * limit
    let where = {}
    if(query) {
        where = {username: {contains: query}}
    }
    const totalResults = await prisma.user.count({
        where
    })
    await prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
            username: true,
            id: true
        }
    })
        .then(users => {
            res.send({users, totalPages: totalResults/limit})
        })
        .catch(e => {
            console.error(e)
            res.status(500)
            res.send('something went wrong')
        })
})

userRoutes.get('/:id', (req,res) => {
    const {id} = req.params
    if(typeof +id !== 'number' ) {
        res.status(400)
        res.send()
    }
    prisma.user.findUnique({
        where: {
            id: +id,
        },
        select: {
            username: true,
            id: true,
            posts: true
        },
    })
        .then(data => {
            console.log(data)
            res.send(data)
        })
        .catch(e => {
            console.error(e)
            res.status(500)
            res.send('Error have occurred on the server')
        })
})