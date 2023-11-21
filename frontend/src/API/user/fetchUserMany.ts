import {apiPath} from "../../share/constants/API.ts";
import {parseQuery} from "../../share/helpers/parseQuery.ts";
import {IUser} from "../../share/interfaces/User.ts";

interface IFetchUserManyReturn {
    users: IUser[]
    totalPages: number
}

export const fetchUserMany = async (page: number | string, query: string): Promise<IFetchUserManyReturn> => {
    const parsedString = query ? `?q=${parseQuery(query)}` : ''
    return await fetch(apiPath+`/user/many/${page}${parsedString}`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(res => res.json())
        .catch(e => {
            console.error(e)
        })
}