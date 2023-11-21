import {Link} from "react-router-dom";
import {FC} from "react";

interface INavbarButton {
    to: string
    children: string
}

const NavbarButton: FC<INavbarButton> = ({to, children}) => {
    return <Link className='h-fit mx-4 px-2 border-b-4 border-slate-800' to={to}>{children}</Link>
};

export default NavbarButton;