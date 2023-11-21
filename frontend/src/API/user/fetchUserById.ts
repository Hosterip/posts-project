import {apiPath} from "../../share/constants/API.ts";
import {IUserWithPosts} from "../../share/interfaces/User.ts";



export const fetchUserById = async (id: string | number): Promise<IUserWithPosts> => {
    return await fetch(apiPath+`/user/${id}`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(res => res.json())
        .catch(e => {
            console.error(e)
        })
}