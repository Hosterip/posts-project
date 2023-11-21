import NavbarButton from "./NavbarButton.tsx";
import {FC} from "react";
import {IUser} from "../../share/interfaces/User.ts";

interface IRightSideButtons {
    logoutHandler: () => void
    user: IUser | null
}

const NavbarRightSide: FC<IRightSideButtons> = ({logoutHandler, user}) => {
    return (
        <div>
            {user
                ?
                <>
                    <button onClick={logoutHandler} className='h-9 mx-4 px-2 border-b-4 border-red-600'>Logout</button>
                    <NavbarButton to={`/profiles/${user.id}`}>Profile</NavbarButton>
                </>
                :
                <>
                    <NavbarButton to='/register'>Sign-up</NavbarButton>
                    <NavbarButton to='/login'>Sign-in</NavbarButton>
                </>
            }
        </div>
    );
};

export default NavbarRightSide;