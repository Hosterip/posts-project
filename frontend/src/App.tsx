import {BrowserRouter, Route, Routes} from "react-router-dom";
import Posts from "./pages/Posts.tsx";
import {useEffect, useState} from "react";
import {useUserStore} from "./zustand/useUser.ts";
import {fetchUser} from "./API/user/fetchUser.ts";
import Auth from "./pages/Auth/Auth.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import ProfileSearch from "./pages/ProfileSearch/ProfileSearch.tsx";
import Profile from "./pages/Profile.tsx";

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
                    <Route path={'/profiles'} element={ <ProfileSearch /> }/>
                    <Route path={'/profiles/:id'} element={ <Profile /> }/>
                </Routes>
            }
        </BrowserRouter>
    );
};

export default App;