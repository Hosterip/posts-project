import {IUser} from "../../App.tsx";
import {apiPath} from "../../share/constants/API.ts";

export const fetchUser = async (): Promise<IUser> => {
    return await fetch(apiPath+'/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then(res => res.json())
        .catch(e => {
            console.error(e)
        })
}