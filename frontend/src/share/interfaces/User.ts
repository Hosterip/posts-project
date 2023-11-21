import {IPost} from "./IPost.ts";

export interface IUserWithPosts extends IUser {
    posts: IPost[]
}

export interface IUser {
    username: string
    id: number
}