import {create} from "zustand";

interface IUser {
    username: string
    id: number
}

interface UserState {
    user: IUser | null
    setUser: (value: IUser | null) => void
}

export const useUserStore = create<UserState>()(set => ({
    user: null,
    setUser: (value: IUser | null) => set({user: value})
}))