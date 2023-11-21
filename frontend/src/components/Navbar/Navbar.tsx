import {useUserStore} from "../../zustand/useUser.ts";
import NavbarButton from "./NavbarButton.tsx";
import {fetchLogout} from "../../API/auth/fetchLogout.ts";

const Navbar = () => {
    const {user, setUser} = useUserStore()

    const logoutHandler = () => {
        fetchLogout()
            .then(res => {
                if(res.status === 200) {
                    setUser(null)
                }
            })
    }

    return (
        <nav className='flex justify-between text-2xl text-slate-800 items-center h-14 bg-amber-50 '>
            <NavbarButton to='/'>Posts</NavbarButton>
            <div>
                {user
                    ?
                    <button onClick={logoutHandler} className='h-fit mx-4 px-2 border-b-4 border-red-600'>Logout</button>
                    :
                    <>
                        <NavbarButton to='/register'>Sign-up</NavbarButton>
                        <NavbarButton to='/login'>Sign-in</NavbarButton>
                    </>
                }
            </div>
        </nav>
    );
};

export default Navbar;