import {useUserStore} from "../../zustand/useUser.ts";
import NavbarButton from "./NavbarButton.tsx";
import {fetchLogout} from "../../API/auth/fetchLogout.ts";
import NavbarRightSide from "./NavbarRightSide.tsx";

const Navbar = () => {
    const {user, setUser} = useUserStore()

    const logoutHandler = () => {
        fetchLogout()
            .then(res => {
                if(res.status === 200 || res.status === 201) {
                    setUser(null)
                }
            })
    }

    return (
        <nav className='flex justify-between text-2xl text-slate-800 items-center h-14 bg-amber-50 '>
            <div>
                <NavbarButton to='/'>Posts</NavbarButton>
                <NavbarButton to='/profiles'>Profiles</NavbarButton>
            </div>
            <NavbarRightSide logoutHandler={logoutHandler} user={user} />
        </nav>
    );
};

export default Navbar;