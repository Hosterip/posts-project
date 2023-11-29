import {PrismaClient} from "@prisma/client";
import {Request, Response} from "express";
const prisma = new PrismaClient();

type whereType = {title: { contains: string }} | {}

export async function postsGetMany (req: Request, res: Response) {
    const page = +req.params.page
    const limit = req.query.limit ? +req.query.limit : 10
    const query = req.query.q
    const skip =  page === 1 ? 0 : (limit)*(page - 1)

    let where: whereType = {}
    if(query) {
        where = {title: { contains: query }}
    }

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
}

export async function postsPostAPost (req: Request, res: Response) {
    const { title, body } = req.body
    console.log('BODY', req.body)
    // @ts-ignore
    const { id } = req.user
    console.log('POST', title, body, id)
    // @ts-ignore
    if(typeof title !== 'string' || typeof body !== 'string') {
        res.status(400);
        res.end()
    }
    if (!(title.trim() && body.trim())) {
        res.status(400)
        res.end()
    }

    await prisma.post.create({
        data: {
            title,
            body,
            author: {
                connect: {
                    id
                }
            }
        }
    })
        .finally(() => res.end())
}