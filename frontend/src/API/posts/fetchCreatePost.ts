import {apiPath} from "../../share/constants/API.ts";

export const fetchCreatePost = async (body: { title: string; body: string }) => {
    const parsedBody = JSON.stringify(body)
    return fetch(apiPath + `/posts/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: parsedBody,
        credentials: 'include'
    })
}