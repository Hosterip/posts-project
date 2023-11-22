import express, {Request, Response} from "express";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export const userRoutes = express.Router()

export function getUser (req: Request, res: Response) {
    console.log('USER', req.user)
    // @ts-ignore
    const {username, id} = req.user
    res.send({username, id})
}

export async function getManyUsers (req: Request, res: Response) {
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
}

export async function getUserById (req: Request, res: Response) {
    const {id} = req.params
    if(typeof +id !== 'number' ) {
        res.status(400)
        res.send()
    }
    await prisma.user.findUnique({
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
}