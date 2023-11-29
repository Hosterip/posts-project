import {apiPath} from "../../share/constants/API.ts";
import {parseQuery} from "../../share/helpers/parseQuery.ts";
import {IPost} from "../../share/interfaces/IPost.ts";

interface IFetchPosts {
    posts: IPost[]
    totalPages: number
}
export const fetchPosts = async (page: number | string, query?: string): Promise<IFetchPosts | undefined> => {
    const queryForFetch = `${query && '?q=' + parseQuery(query)}`
    console.log(queryForFetch)
    return fetch(apiPath + `/posts/${page}${query ? queryForFetch : ''}`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(res => {
            if(res.status === 200) {
                return res.json()
            }
            throw new Error('Something went wrong')
        })
}