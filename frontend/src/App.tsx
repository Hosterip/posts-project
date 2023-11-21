import {BrowserRouter, Route, Routes} from "react-router-dom";
import Posts from "./pages/Posts.tsx";
import {useEffect, useState} from "react";
import {useUserStore} from "./zustand/useUser.ts";
import {fetchUser} from "./API/auth/fetchUser.ts";
import Auth from "./pages/Auth/Auth.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";

export interface IUser {
    username: string
    id: number
}

const App = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const { setUser } = useUserStore()

    useEffect(() => {
        fetchUser()
            .then(res => {
                if(res?.username && res?.id) {
                    setUser(res)
                }
            })
            .finally(() => setLoading(false))
    }, []);

    return (
        <BrowserRouter>
            <Navbar />
            {loading
                ?
                <h1>Loading</h1>
                :
                <Routes>
                    <Route path={'/'} element={ <Posts/> }/>
                    <Route path={'/login'} element={ <Auth typeOfAuth='login'/> }/>
                    <Route path={'/register'} element={ <Auth typeOfAuth='register'/> }/>
                </Routes>
            }
        </BrowserRouter>
    );
};

export default App;