import {apiPath} from "../../share/constants/API.ts";
import {IUser} from "../../share/interfaces/User.ts";

export const fetchUser = async (): Promise<IUser> => {
    return await fetch(apiPath+'/user', {
        method: 'GET',
        credentials: 'include'
    })
        .then(res => res.json())
        .catch(e => {
            console.error(e)
        })
}