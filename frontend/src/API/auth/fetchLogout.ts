import {apiPath} from "../../share/constants/API.ts";

export const fetchLogout = async () => {
    return await fetch(apiPath+'/logout', {
        method: 'POST',
        credentials: 'include'
    })
}