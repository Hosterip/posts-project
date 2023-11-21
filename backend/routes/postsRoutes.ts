import {PrismaClient} from "@prisma/client";
import {isAuth} from "./authMiddleware";
import express from "express";
import {Request, Response} from 'express'
const prisma = new PrismaClient();
export const postsRoutes = express.Router()

type whereType = {title: { contains: string }} | {}

postsRoutes.get('/:page', async (req,res) => {
    const page = +req.params.page
    const limit = req.query.limit ? +req.query.limit : 10
    const query = req.query.q
    const skip =  page === 1 ? 0 : (limit)*(page - 1)
    let where: whereType = {}
    if(query) {
        where = {title: { contains: query }}
    }
    console.log(where)

    const serverError = (e: any) => {
        console.error(e)
        res.status(500)
        res.send('Something went wrong with database')
    }


    const totalPages = await prisma.post.count({
        where
    })
        .then(res => Math.ceil(res / +limit))
        .catch(e => {
            serverError(e)
        })
    await prisma.post.findMany({
        where,
        skip,
        take: limit
    })
        .then((posts) => {
            console.log(posts)

            if (typeof totalPages === "number") {
                res.send({posts, totalPages})
            }
        })
        .catch(e => {
            serverError(e)
        })
})

postsRoutes.post('/create', isAuth, async (req: Request, res: Response) => {
    const { title, body, id } = req.body

    // @ts-ignore
    if(req.user?.id !== id) {
        res.status(401)
        res.end()
    } else if (!(title.trim() && body.trim())) {
        res.status(400)
        res.end()
    }

    await prisma.post.create({
        data: {
            title,
            body,
            author: {
                connect: id
            }
        }
    })
})