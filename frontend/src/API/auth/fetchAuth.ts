import {apiPath} from "../../share/constants/API.ts";

interface IBodyObject {
    username: string
    password: string
}

export const fetchAuth = async (bodyObject: IBodyObject, typeOfAuth: 'register' | 'login') => {
    return await fetch(apiPath + `/${typeOfAuth}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObject),
        credentials: 'include'
    })
}